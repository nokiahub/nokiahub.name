"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  ariaDescribedby?: string;
};

function ImageWithModal({ src, alt, ariaDescribedby }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const getImageWidthAndHeight = () => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;

      return { width: naturalWidth, height: naturalHeight };
    }
  };

  const getImageStyle = () => {
    const { width, height } = getImageWidthAndHeight() ?? {
      width: 1,
      height: 1,
    };

    if (width > height) {
      return {
        width: "80%",
        maxWidth: "80vw",
        height: "auto",
      };
    }

    return {
      width: "auto",
      height: "80%",
      maxHeight: "80vh",
    };
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Image ref={imageRef} alt={alt} width={300} height={300} src={src} />
      </DialogTrigger>
      <DialogContent className={cn("max-h-screen max-w-screen-2xl")}>
        <DialogTitle className={cn("hidden")}>{alt}</DialogTitle>
        <div className={cn("size-screen relative flex justify-center")}>
          <Image
            alt={alt}
            src={src}
            sizes="100vw"
            style={getImageStyle()}
            width={500}
            height={500}
          />
        </div>
        <DialogDescription className={cn("hidden")}>
          {ariaDescribedby}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export { ImageWithModal };
