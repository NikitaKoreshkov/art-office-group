"use client";

import Image from "next/image";
import { useState } from "react";
import { isApiMedia, resolveImageSrc } from "@/lib/images";

type ContentImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
};

export function ContentImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  quality,
  priority,
}: ContentImageProps) {
  const [error, setError] = useState(false);
  const resolved = resolveImageSrc(src);

  if (error || !resolved) {
    if (fill) {
      return <span className={`absolute inset-0 bg-[#eceef2] ${className ?? ""}`} aria-hidden="true" />;
    }
    return (
      <span className="text-[11px] font-medium leading-tight text-center text-gray-400 px-1 line-clamp-2">
        {alt}
      </span>
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      sizes={sizes}
      quality={quality}
      priority={priority}
      unoptimized={isApiMedia(resolved)}
      onError={() => setError(true)}
    />
  );
}
