import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "node:fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const DATA_DIR = path.join(__dirname, "../data");
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(ROOT, "public/uploads");
const CONTENT_PATH = path.join(DATA_DIR, "site-content.json");
const USERS_PATH = path.join(DATA_DIR, "users.json");
const ADMIN_PUBLIC = path.join(__dirname, "../public");
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "art-office-admin-secret-change-in-production";
const PORT = Number(process.env.ADMIN_PORT || 3001);
const DEFAULT_EMAIL = process.env.ADMIN_EMAIL || "artoffice@gmail.com";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "HxHYHGnp";

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function ensureUsers() {
  if (fs.existsSync(USERS_PATH)) return;

  const passwordHash = bcrypt.hashSync(DEFAULT_PASSWORD, 12);
  writeJson(USERS_PATH, {
    email: DEFAULT_EMAIL,
    passwordHash,
    name: "Администратор",
  });
}

function ensureContent() {
  if (fs.existsSync(CONTENT_PATH)) return;

  const fallbacks = [
    path.join(ROOT, "content/site-content.json"),
    path.join(ROOT, "public/content/site-content.json"),
  ];

  for (const source of fallbacks) {
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, CONTENT_PATH);
      return;
    }
  }
}

function syncContentToSite(content) {
  const targets = [
    path.join(ROOT, "content/site-content.json"),
    path.join(ROOT, "public/content/site-content.json"),
  ];

  const json = JSON.stringify(content, null, 2);
  for (const target of targets) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, json, "utf8");
  }

  const webRoot = process.env.WEB_ROOT;
  if (webRoot) {
    const prodTarget = path.join(webRoot, "content/site-content.json");
    fs.mkdirSync(path.dirname(prodTarget), { recursive: true });
    fs.writeFileSync(prodTarget, json, "utf8");
  }
}

function authMiddleware(req, res, next) {
  const token = req.cookies.admin_token;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

ensureUsers();
ensureContent();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]+/g, "-")
      .slice(0, 48);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|mp4|webm|mov|pdf)$/i;
    if (allowed.test(file.originalname)) cb(null, true);
    else cb(new Error("Недопустимый тип файла"));
  },
});

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body ?? {};
  const user = readJson(USERS_PATH, null);

  if (!user || email !== user.email || !bcrypt.compareSync(password, user.passwordHash)) {
    res.status(401).json({ error: "Неверный email или пароль" });
    return;
  }

  const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: "7d" });
  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ email: user.email, name: user.name });
});

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie("admin_token");
  res.json({ ok: true });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  res.json({ email: req.user.email, name: req.user.name });
});

app.put("/api/auth/profile", authMiddleware, (req, res) => {
  const user = readJson(USERS_PATH, null);
  const { currentPassword, newPassword, newEmail, name } = req.body ?? {};

  if (!user || !bcrypt.compareSync(currentPassword, user.passwordHash)) {
    res.status(400).json({ error: "Неверный текущий пароль" });
    return;
  }

  if (newEmail) user.email = newEmail;
  if (name) user.name = name;
  if (newPassword && newPassword.length >= 6) {
    user.passwordHash = bcrypt.hashSync(newPassword, 12);
  }

  writeJson(USERS_PATH, user);
  res.json({ email: user.email, name: user.name });
});

app.get("/api/content", authMiddleware, (_req, res) => {
  res.json(readJson(CONTENT_PATH, {}));
});

app.put("/api/content", authMiddleware, (req, res) => {
  const content = req.body;
  if (!content || typeof content !== "object") {
    res.status(400).json({ error: "Invalid content" });
    return;
  }

  content.updatedAt = new Date().toISOString();
  content.version = (content.version || 0) + 1;
  writeJson(CONTENT_PATH, content);
  syncContentToSite(content);
  res.json(content);
});

app.post("/api/upload", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "Файл не загружен" });
    return;
  }

  res.json({
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/admin", express.static(ADMIN_PUBLIC));
app.get("/admin/*", (_req, res) => {
  res.sendFile(path.join(ADMIN_PUBLIC, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Admin server running on http://localhost:${PORT}/admin`);
});
