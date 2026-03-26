import imageCompression from 'browser-image-compression';

// ─── Date ────────────────────────────────────────────────────────────────────

export function formatDate(dateStr: string, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(dateStr))
}

export function formatDateFull(dateStr: string, locale: string = 'en'): string {
  return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

// ─── String ──────────────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function readTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

// ─── URL ─────────────────────────────────────────────────────────────────────

export function buildSearchParams(params: Record<string, string | number | boolean | undefined>): string {
  const sp = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== '') {
      sp.set(key, String(val))
    }
  }
  return sp.toString()
}

// ─── Class names ─────────────────────────────────────────────────────────────

export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}


interface CompressionOptions {
    maxSizeMB?: number;
    maxWidthOrHeight?: number;
    fileType?: string;
}

/**
 * Helper untuk kompresi gambar ke format WebP di browser
 * @param file - File asli dari input (Blob/File)
 * @param customOptions - Custom setting untuk kompresi
 * @returns Promise<File> - File yang sudah dikompresi dalam format WebP
 */
export async function compressToWebP(
    file: File,
    customOptions: CompressionOptions = {}
): Promise<File> {
    if (!file) throw new Error("No file provided");

    const defaultOptions = {
        maxSizeMB: customOptions.maxSizeMB || 2,
        maxWidthOrHeight: customOptions.maxWidthOrHeight || 1920,
        useWebWorker: true,
        fileType: 'image/webp', // Konsisten menggunakan WebP
        initialQuality: 0.8
    };

    try {
        const compressedBlob = await imageCompression(file, defaultOptions);

        // Ubah extension file menjadi .webp
        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";

        // Kembalikan sebagai objek File agar bisa langsung di-append ke FormData
        return new File([compressedBlob], newFileName, {
            type: 'image/webp',
            lastModified: Date.now()
        });
    } catch (error) {
        console.error("Compression Error:", error);
        throw error;
    }
}
