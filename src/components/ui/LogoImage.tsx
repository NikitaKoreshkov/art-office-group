"use client";

import Image from "next/image";
import { useState } from "react";
import { isApiMedia, resolveImageSrc } from "@/lib/images";

type LogoImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  /** Заполняет родительский relative-контейнер с object-contain */
  fill?: boolean;
  /** Для marquee-анимации: отключает lazy-load чтобы анимация не прыгала */
  eager?: boolean;
  priority?: boolean;
};

export function LogoImage({
  src,
  alt,
  width = 200,
  height = 80,
  className,
  sizes,
  fill,
  eager,
  priority,
}: LogoImageProps) {
  const [error, setError] = useState(false);
  const resolved = resolveImageSrc(src);

  if (error || !resolved) {
    return (
      <span className="text-[11px] font-medium leading-tight text-center text-gray-400 px-1 line-clamp-2">
        {alt}
      </span>
    );
  }

  const loadProps = priority ? { priority: true as const } : { loading: (eager ? "eager" : "lazy") as "eager" | "lazy" };

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes ?? "160px"}
        className={className}
        unoptimized={isApiMedia(resolved)}
        onError={() => setError(true)}
        {...loadProps}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width}
      height={height}
      className={className}
      unoptimized={isApiMedia(resolved)}
      onError={() => setError(true)}
      {...loadProps}
    />
  );
}
