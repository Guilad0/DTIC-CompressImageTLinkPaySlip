"use client";

import type React from "react";

import { useState, useRef } from "react";
import { ArrowLeft, Upload, Download, ImageIcon, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function CompressImagePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedFile(null);
      setCompressedSize(0);
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);

    try {
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        
        canvas.width = img.width;
        canvas.height = img.height;

        
        ctx?.drawImage(img, 0, 0);

        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              setCompressedFile(url);
              setCompressedSize(blob.size);
            }
            setIsCompressing(false);
          },
          selectedFile.type,
          quality[0] / 100,
        );
      };

      img.crossOrigin = "anonymous";
      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (compressedFile && selectedFile) {
      const link = document.createElement("a");
      link.href = compressedFile;
      link.download = `compressed_${selectedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const compressionRatio =
    originalSize > 0
      ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Compresor de Imágenes
            </h1>
            <p className="text-gray-600">
              Reduce el tamaño de tus imágenes sin perder calidad
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Seleccionar Imagen
              </CardTitle>
              <CardDescription>
                Sube una imagen para comprimir (JPG, PNG, WebP)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    {selectedFile
                      ? selectedFile.name
                      : "Haz clic para seleccionar una imagen"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {selectedFile
                      ? `Tamaño: ${formatFileSize(originalSize)}`
                      : "O arrastra y suelta aquí"}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {selectedFile && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">
                        Calidad de compresión: {quality[0]}%
                      </Label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        max={100}
                        min={10}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      onClick={compressImage}
                      disabled={isCompressing}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    >
                      {isCompressing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Comprimiendo...
                        </>
                      ) : (
                        "Comprimir Imagen"
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {compressedFile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">
                  ¡Compresión Completada!
                </CardTitle>
                <CardDescription>
                  Tu imagen ha sido comprimida exitosamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tamaño Original</p>
                    <p className="text-lg font-semibold">
                      {formatFileSize(originalSize)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Tamaño Comprimido</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatFileSize(compressedSize)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Reducción</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {compressionRatio}%
                    </p>
                  </div>
                </div>

                <Button
                  onClick={downloadCompressed}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Imagen Comprimida
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
