import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  containerClassName?: string;
  showSkeleton?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  quality = 85,
  showSkeleton = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${containerClassName}`}>
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        quality={quality}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => console.error(`Failed to load image: ${src}`)}
        {...props}
      />
    </div>
  );
}
