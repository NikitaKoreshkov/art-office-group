import { spawn } from "node:child_process";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const heroVideo = path.join(root, "public", "assets", "hero.mp4");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", cwd: root });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

async function optimizeVideo() {
  const file = await stat(heroVideo).catch(() => null);
  if (!file) {
    console.log("skip hero.mp4 (missing)");
    return;
  }

  const beforeMb = (file.size / 1024 / 1024).toFixed(1);
  const temp = `${heroVideo}.opt.mp4`;

  console.log(`==> Compressing hero.mp4 (${beforeMb} MB)`);
  await run("ffmpeg", [
    "-y",
    "-i",
    heroVideo,
    "-vf",
    "scale=1920:-2",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-profile:v",
    "high",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    temp,
  ]);

  await run("mv", [temp, heroVideo]);
  const after = await stat(heroVideo);
  console.log(`hero.mp4 ${beforeMb} MB → ${(after.size / 1024 / 1024).toFixed(1)} MB`);
}

async function main() {
  await run("node", ["scripts/optimize-assets.mjs"]);
  await optimizeVideo();
  console.log("All optimizations complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
