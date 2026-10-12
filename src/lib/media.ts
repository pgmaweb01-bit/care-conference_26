const MAX_IMAGE_DIMENSION = 1200;
const IMAGE_QUALITY = 0.82;

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
};

export function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

export async function compressImageToDataUrl(
  file: File,
  maxDim = MAX_IMAGE_DIMENSION,
  quality = IMAGE_QUALITY,
): Promise<string> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return readAsDataURL(file);
  }

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close?.();
    return readAsDataURL(file);
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const compressed = canvas.toDataURL("image/jpeg", quality);
  if (compressed.length > file.size * 1.4) return readAsDataURL(file);
  return compressed;
}

export interface ProcessedSpeakerMedia {
  headshot: string | null;
  photos: string[];
  cv: { name: string; dataUrl: string } | null;
  error?: string;
}

export async function processSpeakerMedia(media: {
  headshot: File | null;
  photos: File[];
  cv: File | null;
}): Promise<ProcessedSpeakerMedia> {
  try {
    const headshot = media.headshot ? await compressImageToDataUrl(media.headshot) : null;

    const photos: string[] = [];
    for (const photo of media.photos) {
      if (!photo.type.startsWith("image/")) continue;
      photos.push(await compressImageToDataUrl(photo));
    }

    let cv: { name: string; dataUrl: string } | null = null;
    if (media.cv) {
      if (media.cv.size > 2 * 1024 * 1024) {
        return {
          headshot,
          photos,
          cv: null,
          error: `"${media.cv.name}" is larger than 2 MB. Please upload a smaller CV file.`,
        };
      }
      cv = { name: media.cv.name, dataUrl: await readAsDataURL(media.cv) };
    }

    return { headshot, photos, cv };
  } catch (err) {
    return {
      headshot: null,
      photos: [],
      cv: null,
      error: err instanceof Error ? err.message : "Could not process the selected files.",
    };
  }
}

export function dataUrlMime(dataUrl: string): string {
  const match = /^data:([^;,]+)/.exec(dataUrl);
  return match?.[1] ?? "";
}

export function dataUrlExtension(dataUrl: string): string {
  return EXTENSION_BY_MIME[dataUrlMime(dataUrl)] ?? "";
}

export function safeFileName(name: string): string {
  return (
    name
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "file"
  );
}

function triggerDownload(href: string, filename: string, revoke: boolean) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  if (revoke) setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  triggerDownload(dataUrl, filename, false);
}

export function downloadText(content: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
  triggerDownload(url, filename, true);
}
