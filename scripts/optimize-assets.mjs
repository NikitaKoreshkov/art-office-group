/**
 * Сжимает JPEG/PNG в public/images и hero-poster.
 * Требует: npm install (sharp в devDependencies).
 *
 * Видео hero.mp4 (~21MB) сожмите отдельно, например:
 * ffmpeg -i public/assets/hero.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/assets/hero.mp4
 */
import sharp from "sharp";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  path.join(root, "public", "images"),
  path.join(root, "public", "assets", "hero-poster.jpg"),
];

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 78;

async function optimizeFile(filePath) {
  const before = await stat(filePath);
  const input = await readFile(filePath);
  const pipeline = sharp(input).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
    fit: "inside",
  });

  const ext = path.extname(filePath).toLowerCase();
  const output =
    ext === ".png"
      ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  if (output.length >= before.size * 0.97) {
    console.log(`skip ${path.relative(root, filePath)} (${before.size} B)`);
    return;
  }

  await writeFile(filePath, output);
  console.log(
    `ok   ${path.relative(root, filePath)} ${Math.round(before.size / 1024)}KB → ${Math.round(output.length / 1024)}KB`,
  );
}

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    if (/\.(jpe?g|png)$/i.test(entry.name)) {
      try {
        await optimizeFile(full);
      } catch {
        console.warn(`warn ${path.relative(root, full)} — unsupported format, skipped`);
      }
    }
  }
}

async function main() {
  for (const target of targets) {
    const st = await stat(target).catch(() => null);
    if (!st) continue;
    if (st.isDirectory()) await walk(target);
    else await optimizeFile(target);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
