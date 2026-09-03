#!/usr/bin/env python3
import io
import os
import subprocess
import sys
import tarfile
import time

try:
    import paramiko
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paramiko", "-q"])
    import paramiko

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESEND_KEYS = ("RESEND_API_KEY", "RESEND_FROM_EMAIL", "CONTACT_NOTIFY_EMAIL")


def read_local_env():
    env_local = os.path.join(ROOT, ".env.local")
    values = {}
    if not os.path.isfile(env_local):
        return values
    with open(env_local, encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            if value:
                values[key] = value
    return values


LOCAL_ENV = read_local_env()
HOST = os.environ.get("DEPLOY_HOST") or LOCAL_ENV.get("DEPLOY_HOST", "194.238.41.22")
USER = os.environ.get("DEPLOY_USER") or LOCAL_ENV.get("DEPLOY_USER", "ubuntu")
PASSWORD = os.environ.get("DEPLOY_PASSWORD") or LOCAL_ENV.get("DEPLOY_PASSWORD")
if not PASSWORD:
    raise SystemExit("DEPLOY_PASSWORD is required in the environment or .env.local")
APP_DIR = os.environ.get("DEPLOY_APP_DIR") or LOCAL_ENV.get("DEPLOY_APP_DIR", "/opt/art-office")
REMOTE = "/tmp/art-office-deploy.tar.gz"
EXCLUDE_DIRS = {"node_modules", ".git", ".next", ".next-build", "out", "coverage"}


def run(client, cmd, timeout=900, check=True):
    _, stdout, _ = client.exec_command(cmd, get_pty=True, timeout=timeout)
    out = stdout.read().decode(errors="replace")
    code = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.rstrip()[-2000:])
    if check and code:
        raise SystemExit(code)
    return out


def read_resend_env():
    return {key: LOCAL_ENV[key] for key in RESEND_KEYS if LOCAL_ENV.get(key)}


def sync_resend_env(client, values):
    if not values:
        print("No Resend env in .env.local, skipping")
        return

    upsert_lines = [
        f'ENV_FILE="{APP_DIR}/.env"',
        'touch "$ENV_FILE"',
        "upsert() {",
        '  local key="$1"',
        '  local val="$2"',
        '  if grep -q "^${key}=" "$ENV_FILE"; then',
        '    sed -i "s|^${key}=.*|${key}=${val}|" "$ENV_FILE"',
        "  else",
        '    echo "${key}=${val}" >> "$ENV_FILE"',
        "  fi",
        "}",
    ]
    for key, value in values.items():
        safe = value.replace('"', '\\"')
        upsert_lines.append(f'upsert {key} "{safe}"')
    upsert_lines.append('echo "Resend env synced"')
    run(client, "bash -s <<'EOF'\n" + "\n".join(upsert_lines) + "\nEOF")


def build_archive():
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        for dirpath, dirnames, filenames in os.walk(ROOT):
            dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
            for filename in filenames:
                if filename == ".DS_Store":
                    continue
                full = os.path.join(dirpath, filename)
                rel = os.path.relpath(full, ROOT)
                if rel.startswith(".env"):
                    continue
                tar.add(full, arcname=rel)
    return buf.getvalue()


def main():
    print(f"==> Packaging app from {ROOT}")
    payload = build_archive()

    print(f"==> Connecting to {USER}@{HOST}")
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(HOST, username=USER, password=PASSWORD, timeout=30)

    try:
        print("==> Uploading archive")
        sftp = client.open_sftp()
        with sftp.file(REMOTE, "wb") as remote_file:
            remote_file.write(payload)
        sftp.close()

        print("==> Extracting on server")
        run(client, f"mkdir -p {APP_DIR} && tar -xzf {REMOTE} -C {APP_DIR}")

        print("==> Syncing Resend env")
        sync_resend_env(client, read_resend_env())

        print("==> Installing dependencies")
        run(client, f"cd {APP_DIR} && npm ci", timeout=1200)

        print("==> Syncing content JSON")
        run(client, f"cd {APP_DIR} && npm run content:sync", timeout=300)

        print("==> Building on server")
        run(client, f"cd {APP_DIR} && rm -rf .next && npx next build", timeout=1200)

        print("==> Restarting service")
        run(client, "sudo systemctl restart art-office")
        time.sleep(2)
        run(client, "systemctl is-active art-office")
    finally:
        client.close()

    print("Deploy complete: https://art-office.kz")


if __name__ == "__main__":
    main()
