
import React, { useState, useCallback, useRef } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageCaptured: (imageData: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageCaptured }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setImage(imageData);
          onImageCaptured(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please drop an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setImage(imageData);
          onImageCaptured(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageCaptured]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera. Please check permissions.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setImage(imageData);
        onImageCaptured(imageData);
        closeCamera();
        toast.success('Image captured successfully');
      }
    }
  };

  const resetImage = () => {
    setImage(null);
  };

  return (
    <div className="w-full">
      {!image && !isCameraOpen && (
        <div
          className={`image-upload-area ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <div className="bg-muted rounded-full p-3 mx-auto mb-3">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Upload Leaf Image</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Drag and drop an image here, or click to select a file
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary"
            >
              <Upload className="w-4 h-4" />
              Browse Files
            </button>
            
            <button
              type="button"
              onClick={openCamera}
              className="btn-outline"
            >
              <Camera className="w-4 h-4" />
              Use Camera
            </button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      )}
      
      {isCameraOpen && (
        <div className="relative overflow-hidden rounded-xl shadow-lg border border-border animate-fade-in">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex justify-between">
            <button
              type="button"
              onClick={closeCamera}
              className="btn-outline bg-white/20 border-white/50 text-white"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            
            <button
              type="button"
              onClick={captureImage}
              className="btn-primary"
            >
              <Camera className="w-4 h-4" />
              Capture
            </button>
          </div>
        </div>
      )}
      
      {image && (
        <div className="image-preview animate-scale-in">
          <img src={image} alt="Uploaded leaf" className="w-full h-auto rounded-xl" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <button
              type="button"
              onClick={resetImage}
              className="btn-outline bg-white/20 border-white/50 text-white"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
