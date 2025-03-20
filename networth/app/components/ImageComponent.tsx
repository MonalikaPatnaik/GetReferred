"use client";
import Image from 'next/image';

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const ImageComponent = ({
  src,
  alt,
  width = 500,
  height = 400,
  className = "max-w-full h-auto",
  priority = false
}: ImageComponentProps) => {
  return (
    <Image 
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      className={className}
      priority={priority}
    />
  );
};

export default ImageComponent;
