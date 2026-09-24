// Client-side image validation and HTML Canvas compression utility

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MAX_ALLOWED_FILE_SIZE_MB = 10;

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file format (${file.type || 'unknown'}). Please select a JPG, JPEG, PNG, or WebP image.`,
    };
  }

  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_ALLOWED_FILE_SIZE_MB) {
    return {
      valid: false,
      error: `File size (${fileSizeMB.toFixed(1)}MB) exceeds the maximum limit of ${MAX_ALLOWED_FILE_SIZE_MB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Resizes and compresses an image using HTML Canvas.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<{ file: File; originalSize: number; compressedSize: number; previewUrl: string }> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.82 } = options;
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio scaled dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const previewUrl = URL.createObjectURL(file);
          return resolve({ file, originalSize, compressedSize: file.size, previewUrl });
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to blob
        const outputMime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              const previewUrl = URL.createObjectURL(file);
              return resolve({ file, originalSize, compressedSize: file.size, previewUrl });
            }

            const compressedFile = new File([blob], file.name, {
              type: outputMime,
              lastModified: Date.now(),
            });

            const previewUrl = URL.createObjectURL(compressedFile);
            resolve({
              file: compressedFile,
              originalSize,
              compressedSize: compressedFile.size,
              previewUrl,
            });
          },
          outputMime,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
  });
}
