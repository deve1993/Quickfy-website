/**
 * Image Optimization Utilities
 *
 * Utilities for optimizing, resizing, and converting images for brand assets.
 * Handles logo uploads, base64 conversion, and image validation.
 */

/**
 * Supported image formats
 */
export const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/webp"];

/**
 * Maximum file size (5MB)
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Recommended logo dimensions
 */
export const RECOMMENDED_DIMENSIONS = {
  logo: { width: 200, height: 60 },
  favicon: { width: 32, height: 32 },
};

/**
 * Image validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate image file
 *
 * @param file - File to validate
 * @returns Validation result
 */
export function validateImageFile(file: File): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    errors.push(
      `Unsupported format: ${file.type}. Supported formats: PNG, JPG, SVG, WebP`
    );
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(
      `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum: 5MB`
    );
  }

  // Check if size is reasonable for a logo
  if (file.size < 1024) {
    warnings.push("File is very small. May not display well at larger sizes.");
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Convert File to base64 data URL
 *
 * @param file - Image file
 * @returns Promise resolving to base64 data URL
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as base64"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Get image dimensions from File
 *
 * @param file - Image file
 * @returns Promise resolving to { width, height }
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
        });
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Failed to read image data"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Resize image to fit within max dimensions
 *
 * @param file - Image file
 * @param maxWidth - Maximum width
 * @param maxHeight - Maximum height
 * @param quality - JPEG quality (0-1)
 * @returns Promise resolving to resized base64 data URL
 */
export async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.9
): Promise<string> {
  // For SVG, just convert to base64 without resizing
  if (file.type === "image/svg+xml") {
    return fileToBase64(file);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;

          if (width > height) {
            width = maxWidth;
            height = width / aspectRatio;
          } else {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        // Create canvas and resize
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64
        try {
          const outputFormat = file.type === "image/png" ? "image/png" : "image/jpeg";
          const resizedBase64 = canvas.toDataURL(outputFormat, quality);
          resolve(resizedBase64);
        } catch (error) {
          reject(new Error("Failed to convert canvas to base64"));
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      } else {
        reject(new Error("Failed to read image data"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Optimize image for web
 *
 * - Validates format and size
 * - Resizes if necessary
 * - Converts to optimized format
 *
 * @param file - Image file
 * @param options - Optimization options
 * @returns Optimized base64 data URL
 */
export async function optimizeImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<{
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}> {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.85,
  } = options;

  // Validate
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.errors.join(", "));
  }

  // Get original dimensions
  const originalDimensions = await getImageDimensions(file);

  // Resize if needed
  const dataUrl = await resizeImage(file, maxWidth, maxHeight, quality);

  // Calculate new size (approximate, base64 is ~33% larger than binary)
  const base64Size = Math.ceil((dataUrl.length * 3) / 4);

  // Get new dimensions (may be same if not resized)
  let finalWidth = originalDimensions.width;
  let finalHeight = originalDimensions.height;

  if (originalDimensions.width > maxWidth || originalDimensions.height > maxHeight) {
    const aspectRatio = originalDimensions.width / originalDimensions.height;
    if (originalDimensions.width > originalDimensions.height) {
      finalWidth = maxWidth;
      finalHeight = Math.round(maxWidth / aspectRatio);
    } else {
      finalHeight = maxHeight;
      finalWidth = Math.round(maxHeight * aspectRatio);
    }
  }

  return {
    dataUrl,
    width: finalWidth,
    height: finalHeight,
    size: base64Size,
  };
}

/**
 * Format file size for display
 *
 * @param bytes - Size in bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Check if image is light or dark
 *
 * Useful for automatically determining theme variants
 *
 * @param dataUrl - Base64 data URL
 * @returns Promise resolving to 'light' or 'dark'
 */
export function detectImageBrightness(dataUrl: string): Promise<"light" | "dark"> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let totalBrightness = 0;
      let pixelCount = 0;

      // Sample every 10th pixel for performance
      for (let i = 0; i < data.length; i += 40) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip fully transparent pixels
        if (a < 10) continue;

        // Calculate perceived brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        totalBrightness += brightness;
        pixelCount++;
      }

      const avgBrightness = totalBrightness / pixelCount;

      // If average brightness > 127, consider it light
      resolve(avgBrightness > 127 ? "light" : "dark");
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = dataUrl;
  });
}
