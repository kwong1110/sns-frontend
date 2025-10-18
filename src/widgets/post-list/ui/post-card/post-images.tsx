"use client";

import type React from "react";

import { ImageModal } from "@/shared/components";
import { cn } from "@/shared/lib/ui-utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface PostImagesProps {
  images: string[];
}

export function PostImages({ images }: PostImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  if (images.length === 1) {
    return (
      <>
        <div
          className="overflow-hidden rounded-2xl w-fit"
          style={{ maxHeight: "200px" }}
        >
          <button
            className="relative flex justify-start items-center cursor-pointer"
            onClick={() => setSelectedImage(images[0])}
            type="button"
            style={{ maxHeight: "200px" }}
          >
            <Image
              src={images[0] || "/placeholder.svg"}
              alt="Post image"
              width={500}
              height={200}
              className="w-auto h-auto max-w-full max-h-[200px] object-contain"
              loading="lazy"
            />
          </button>
        </div>

        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div
          className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl"
          style={{ maxHeight: "300px" }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className="relative overflow-hidden bg-muted transition-opacity hover:opacity-95 cursor-pointer"
              onClick={() => setSelectedImage(image)}
              type="button"
              style={{ height: "200px" }}
            >
              <Image
                src={image || "./placeholder.svg"}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 200px"
              />
            </button>
          ))}
        </div>

        {selectedImage && (
          <ImageModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl bg-muted"
        style={{ maxHeight: "300px" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="relative min-w-full flex justify-center items-center cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Post image ${index + 1}`}
                width={800}
                height={200}
                className="w-auto h-auto max-w-full max-h-[200px] object-contain"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white transition-colors hover:bg-black/70 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
          {currentIndex + 1} / {images.length}
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
