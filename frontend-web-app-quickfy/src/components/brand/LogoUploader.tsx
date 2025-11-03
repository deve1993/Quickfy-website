/**
 * Logo Uploader Component
 *
 * Drag & drop or click to upload logo images.
 * Supports light and dark theme variants with automatic optimization.
 */

"use client";

import { useCallback, useState } from "react";
import { Upload, X, AlertCircle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  validateImageFile,
  optimizeImage,
  formatFileSize,
  SUPPORTED_FORMATS,
  MAX_FILE_SIZE,
} from "@/lib/brand/imageOptimizer";
import type { Logo } from "@/types/brand";
import { cn } from "@/lib/utils";

interface LogoUploaderProps {
  /**
   * Upload type (determines optimization settings)
   */
  type: "primary" | "secondary" | "favicon";
  /**
   * Theme variant being uploaded
   */
  theme: "light" | "dark";
  /**
   * Current logo (if any)
   */
  currentLogo?: Logo;
  /**
   * Callback when logo is uploaded
   */
  onUpload: (logo: Partial<Logo>) => void;
  /**
   * Callback when logo is removed
   */
  onRemove?: () => void;
  /**
   * Label for the uploader
   */
  label?: string;
}

/**
 * Logo Uploader Component
 */
export function LogoUploader({
  type,
  theme,
  currentLogo,
  onUpload,
  onRemove,
  label,
}: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Get optimization settings based on type
  const getOptimizationSettings = () => {
    switch (type) {
      case "favicon":
        return { maxWidth: 128, maxHeight: 128, quality: 1 };
      case "primary":
      case "secondary":
        return { maxWidth: 800, maxHeight: 400, quality: 0.9 };
      default:
        return { maxWidth: 800, maxHeight: 800, quality: 0.85 };
    }
  };

  // Handle file upload
  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setSuccess(false);
      setIsUploading(true);
      setUploadProgress(0);

      try {
        // Validate
        const validation = validateImageFile(file);
        if (!validation.valid) {
          throw new Error(validation.errors.join(", "));
        }

        // Show warnings if any
        if (validation.warnings.length > 0) {
          console.warn("Image warnings:", validation.warnings);
        }

        // Simulate progress
        setUploadProgress(30);

        // Optimize
        const optimized = await optimizeImage(file, getOptimizationSettings());

        setUploadProgress(70);

        // Create logo object
        const logo: Partial<Logo> = {
          name: file.name,
          width: optimized.width,
          height: optimized.height,
          fileSize: optimized.size,
          uploadedAt: new Date().toISOString(),
        };

        // Set the correct URL based on theme
        if (theme === "light") {
          logo.lightUrl = optimized.dataUrl;
          // Keep existing dark URL if available
          if (currentLogo?.darkUrl) {
            logo.darkUrl = currentLogo.darkUrl;
          }
        } else {
          logo.darkUrl = optimized.dataUrl;
          // Keep existing light URL if available
          if (currentLogo?.lightUrl) {
            logo.lightUrl = currentLogo.lightUrl;
          }
        }

        setUploadProgress(100);

        // Notify parent
        onUpload(logo);

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload logo");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [theme, currentLogo, onUpload, type]
  );

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // Handle file input
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // Get current logo URL for this theme
  const currentUrl = theme === "light" ? currentLogo?.lightUrl : currentLogo?.darkUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          <span>{label || `${theme === "light" ? "Light" : "Dark"} Theme Logo`}</span>
          {currentUrl && onRemove && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRemove}
              className="h-7 text-destructive hover:text-destructive"
            >
              <X className="w-3 h-3 mr-1" />
              Remove
            </Button>
          )}
        </CardTitle>
        <CardDescription>
          {type === "favicon"
            ? "Upload a small icon (32x32 or larger)"
            : "Upload a logo (PNG, JPG, SVG, or WebP, max 5MB)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Logo Preview */}
        {currentUrl && !isUploading && (
          <div className="p-4 rounded-lg border bg-card flex items-center justify-center min-h-[120px]">
            <img
              src={currentUrl}
              alt={`${type} logo - ${theme} theme`}
              className="max-w-full max-h-[100px] object-contain"
            />
          </div>
        )}

        {/* Upload Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/50",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            accept={SUPPORTED_FORMATS.join(",")}
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <>
                <ImageIcon className="w-10 h-10 text-muted-foreground animate-pulse" />
                <div className="w-full max-w-xs">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Optimizing image... {uploadProgress}%
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    Drop your logo here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, SVG, WebP (max {formatFileSize(MAX_FILE_SIZE)})
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Message */}
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-sm text-green-800 dark:text-green-200">
              Logo uploaded and optimized successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Logo Info */}
        {currentLogo && currentUrl && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-xs">
            <div className="flex-1">
              <p className="font-medium">{currentLogo.name}</p>
              <p className="text-muted-foreground">
                {currentLogo.width} × {currentLogo.height}
                {currentLogo.fileSize && ` • ${formatFileSize(currentLogo.fileSize)}`}
              </p>
            </div>
            <Badge variant="secondary" className="text-[10px]">
              {theme}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
