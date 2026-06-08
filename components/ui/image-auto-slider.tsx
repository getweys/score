"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export interface ImageAutoSliderProps {
  images: readonly string[];
  className?: string;
  /** One full loop duration in seconds */
  durationSeconds?: number;
}

export function ImageAutoSlider({
  images,
  className = "",
  durationSeconds = 28,
}: ImageAutoSliderProps) {
  const reduceMotion = useReducedMotion();

  if (images.length === 0) return null;

  const duplicatedImages = [...images, ...images];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="py-2 sm:py-4">
        <div
          className={`image-auto-slider-track flex w-max gap-4 sm:gap-5 lg:gap-6 ${
            reduceMotion ? "flex-wrap justify-center" : ""
          }`}
          style={
            reduceMotion
              ? undefined
              : ({ "--slider-duration": `${durationSeconds}s` } as CSSProperties)
          }
        >
          {(reduceMotion ? images : duplicatedImages).map((src, index) => {
            const imageIndex = index % images.length;

            return (
              <div
                key={`${src}-${index}`}
                className="image-auto-slider-item relative h-44 w-64 shrink-0 overflow-hidden rounded-xl shadow-[0_16px_40px_-20px_rgba(15,23,42,0.45)] ring-1 ring-secondary/10 sm:h-52 sm:w-80 lg:h-64 lg:w-96"
              >
                <Image
                  src={src}
                  alt={`M-9 motorway gallery photograph ${String(imageIndex + 1).padStart(2, "0")}`}
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority={imageIndex < 2}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Alias for shadcn-style demo imports */
export const Component = ImageAutoSlider;
