import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, '../public/images/gallery');

// Allowed image extensions
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

const DRY_RUN = process.argv.includes('--dry-run') || process.env.DRY_RUN === '1';

function getAllFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getAllFiles(name, filesList);
    } else {
      const ext = path.extname(name).toLowerCase();
      if (IMAGE_EXTS.includes(ext)) {
        filesList.push(name);
      }
    }
  }
  return filesList;
}

function extToFormat(ext) {
  if (ext === '.jpg' || ext === '.jpeg') return 'jpeg';
  if (ext === '.png') return 'png';
  if (ext === '.webp') return 'webp';
  return null;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const expectedFormat = extToFormat(ext);
  let stats;
  try {
    stats = fs.statSync(filePath);
  } catch (err) {
    return { error: true, msg: `stat failed: ${err.message}` };
  }

  const sizeBeforeKB = Math.round(stats.size / 1024);

  // Skip files that are already very small (under 100KB) or empty
  if (stats.size === 0) {
    return { error: true, msg: 'empty file' };
  }
  if (sizeBeforeKB < 100) {
    return { skipped: true, sizeBeforeKB };
  }

  // Use system temp dir for safety and unique filename
  const tmpName = `${path.basename(filePath)}.${Date.now()}.${crypto.randomUUID()}.tmp`;
  const tempFilePath = path.join(os.tmpdir(), tmpName);

  try {
    let pipeline = sharp(filePath);

    // Resize image to max 1000px width or height, preserving aspect ratio, only if it's larger
    pipeline = pipeline.resize({
      width: 1000,
      height: 1000,
      fit: 'inside',
      withoutEnlargement: true
    });

    if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    } else if (ext === '.png') {
      // png doesn't support 'quality' option in sharp; use compressionLevel
      pipeline = pipeline.png({ compressionLevel: 8 });
    } else if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 80 });
    }

    if (DRY_RUN) {
      // write to temp but don't overwrite original
      await pipeline.toFile(tempFilePath);
      const meta = await sharp(tempFilePath).metadata();
      fs.unlinkSync(tempFilePath);
      return { dryRun: true, sizeBeforeKB, estimatedFormat: meta.format };
    }

    // write compressed file to temp location
    await pipeline.toFile(tempFilePath);

    // Validate the temp file with sharp metadata
    let metadata;
    try {
      metadata = await sharp(tempFilePath).metadata();
    } catch (err) {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: `validation failed: ${err.message}` };
    }

    if (!metadata || !metadata.format) {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: 'unknown output format' };
    }

    if (expectedFormat && metadata.format !== expectedFormat) {
      // format mismatch — refuse to overwrite
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: `format mismatch: expected ${expectedFormat} got ${metadata.format}` };
    }

    const tempStats = fs.statSync(tempFilePath);
    if (tempStats.size === 0) {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: 'temp file zero bytes' };
    }

    // Create a backup of the original file (if not already present)
    const backupPath = `${filePath}.bak`;
    try {
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
      }
    } catch (err) {
      // if backup fails, remove temp and abort to avoid data loss
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: `backup failed: ${err.message}` };
    }

    // Atomically replace original with the temp file
    try {
      fs.renameSync(tempFilePath, filePath);
    } catch (err) {
      if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      return { error: true, msg: `replace failed: ${err.message}` };
    }

    const sizeAfterKB = Math.round(fs.statSync(filePath).size / 1024);
    return { skipped: false, sizeBeforeKB, sizeAfterKB };
  } catch (err) {
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    console.error(`❌ Error compressing ${path.basename(filePath)}:`, err.message);
    return { error: true, msg: err.message };
  }
}

async function main() {
  if (!fs.existsSync(GALLERY_DIR)) {
    console.error(`🚨 Error: Gallery directory not found at ${GALLERY_DIR}`);
    process.exit(1);
  }

  console.log('🔍 Scanning gallery for images...');
  const files = getAllFiles(GALLERY_DIR);
  console.log(`📸 Found ${files.length} images. Starting compression...`);

  let totalBefore = 0;
  let totalAfter = 0;
  let compressedCount = 0;
  let skippedCount = 0;
  let dryRunCount = 0;
  let errorCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relativePath = path.relative(GALLERY_DIR, file);
    const result = await compressImage(file);

    if (result.error) {
      errorCount++;
      console.error(`⚠️ [${i + 1}/${files.length}] Failed ${relativePath}: ${result.msg || 'unknown'}`);
      continue;
    }

    if (result.dryRun) {
      dryRunCount++;
      console.log(`🔎 [${i + 1}/${files.length}] Dry-run OK ${relativePath}: ${result.estimatedFormat || ''}`);
      totalBefore += result.sizeBeforeKB;
      totalAfter += result.sizeBeforeKB;
      continue;
    }

    if (result.skipped) {
      skippedCount++;
      totalBefore += result.sizeBeforeKB;
      totalAfter += result.sizeBeforeKB;
    } else {
      compressedCount++;
      totalBefore += result.sizeBeforeKB;
      totalAfter += result.sizeAfterKB;
      const reduction = Math.round(((result.sizeBeforeKB - result.sizeAfterKB) / result.sizeBeforeKB) * 100);
      console.log(`⚡ [${i + 1}/${files.length}] Compressed ${relativePath}: ${result.sizeBeforeKB}KB -> ${result.sizeAfterKB}KB (-${reduction}%)`);
    }
  }

  const overallReduction = totalBefore > 0 ? Math.round(((totalBefore - totalAfter) / totalBefore) * 100) : 0;
  console.log('\n==================================================');
  console.log(`🎉 Compression Completed!`);
  console.log(`📁 Total images: ${files.length}`);
  console.log(`📦 Compressed: ${compressedCount}`);
  console.log(`⏭️ Skipped (already small): ${skippedCount}`);
  if (DRY_RUN) console.log(`🔒 Dry-run mode: no files were overwritten`);
  console.log(`⛔ Errors: ${errorCount}`);
  console.log(`📉 Total Gallery Size before: ${(totalBefore / 1024).toFixed(2)} MB`);
  console.log(`📈 Total Gallery Size after:  ${(totalAfter / 1024).toFixed(2)} MB`);
  console.log(`💥 Total size reduction:      ${((totalBefore - totalAfter) / 1024).toFixed(2)} MB (-${overallReduction}%)`);
  console.log('==================================================\n');
}

main();
