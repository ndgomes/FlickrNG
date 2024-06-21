import Image from "next/image";
import { useEffect, useState } from "react";

interface CustomImageProps {
  src: string;
  className?: string;
}

interface ImageDimensions {
  width: number | null;
  height: number | null;
}

export default function CustomImage(props: CustomImageProps) {
  const [dimensions, setDimensions] = useState<ImageDimensions>({
    width: null,
    height: null,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = props.src;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
  }, [props.src]);

  const { width, height } = dimensions;

  // Avoid rendering until dimensions are loaded
  if (!width || !height) return null;

  return (
    <Image
      className={`object-cover rounded-lg m-3 ${props.className}`}
      src={props.src}
      width={width}
      height={height}
      quality={100}
      alt={"ImageModal"}
    />
  );
}
