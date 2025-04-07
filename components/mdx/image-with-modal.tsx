"use client";

import Image from "next/image";
import { useRef } from "react";
import { IMAGE_URL } from "@/consts/envVariables";

type Props = {
  src: string;
  alt: string;
  ariaDescribedby?: string;
};

function ImageWithModal({ src, alt, ariaDescribedby }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <Image
      sizes="(max-width: 500px) 80vw, 400px"
      ref={imageRef}
      alt={alt}
      width={400}
      height={400}
      placeholder="blur"
      blurDataURL={`${IMAGE_URL}${src}`}
      src={`${IMAGE_URL}${src}`}
    />
  );
}

export { ImageWithModal };
