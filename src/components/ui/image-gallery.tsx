import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-1 relative h-[20vh]">
        {/* Main Image */}
        <div 
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => setFullscreen(true)}
        >
          <img
            src={images[0]}
            alt="Property"
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>

        {/* Side Images */}
        {images.slice(1, 5).map((image, index) => (
          <div 
            key={index}
            className={cn(
              "relative cursor-pointer overflow-hidden h-full",
              index === 3 && "rounded-tr-md",
              index === 2 && "rounded-br-md"
            )}
            onClick={() => {
              setActiveImage(index + 1);
              setFullscreen(true);
            }}
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Grid className="w-4 h-4 mx-auto mb-0.5" />
                  <span className="text-xs">Show all</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Gallery */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setFullscreen(false)}
          >
            <X className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={previousImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="w-full h-full flex flex-col items-center justify-center px-12">
            <div className="relative w-full h-[70vh]">
              <img
                src={images[activeImage]}
                alt={`Property ${activeImage + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-2 flex gap-1 overflow-x-auto max-w-full p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2",
                    activeImage === index ? "border-white" : "border-transparent"
                  )}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      )}
    </>
  );
}