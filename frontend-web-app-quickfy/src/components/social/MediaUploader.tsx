"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Video } from "lucide-react";
import { validateMediaFile, createMediaPreview } from "@/lib/api/ai";
import { toast } from "sonner";
import type { UploadedMedia } from "@/types/social";

interface MediaUploaderProps {
  onMediaUpload: (media: UploadedMedia | null) => void;
}

export function MediaUploader({ onMediaUpload }: MediaUploaderProps) {
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // Validate file
    const validation = validateMediaFile(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const preview = await createMediaPreview(file);

      const media: UploadedMedia = {
        file,
        preview,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        size: file.size,
      };

      setUploadedMedia(media);
      onMediaUpload(media);
      toast.success("File caricato con successo!");
    } catch (error) {
      console.error(error);
      toast.error("Errore durante il caricamento del file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]); // Only handle first file
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    setUploadedMedia(null);
    onMediaUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      {!uploadedMedia ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Upload className={`h-12 w-12 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            <p className="text-center font-medium mb-2">
              {isUploading ? 'Caricamento in corso...' : 'Trascina un file qui o clicca per selezionare'}
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Formati supportati: JPG, PNG, GIF, MP4, MOV
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Max 10MB per immagini, 50MB per video
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Preview */}
              <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-muted">
                {uploadedMedia.type === 'image' ? (
                  <img
                    src={uploadedMedia.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={uploadedMedia.preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {uploadedMedia.type === 'image' ? (
                      <ImageIcon className="h-4 w-4 text-primary" />
                    ) : (
                      <Video className="h-4 w-4 text-primary" />
                    )}
                    <span className="font-medium truncate">
                      {uploadedMedia.file.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemove}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Tipo: {uploadedMedia.type === 'image' ? 'Immagine' : 'Video'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dimensione: {formatFileSize(uploadedMedia.size)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
