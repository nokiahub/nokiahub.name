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
import { IMAGE_URL } from "@/consts/envVariables";

type Props = {
  src: string;
  alt: string;
  ariaDescribedby?: string;
};

function ImageWithModal({ src, alt, ariaDescribedby }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <Dialog>
      <DialogTrigger>
        <Image
          style={{
            width: "100%",
            height: "auto",
          }}
          sizes="(max-width: 500px) 90vw, 450px"
          ref={imageRef}
          alt={alt}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={`${IMAGE_URL}${src}`}
          src={`${IMAGE_URL}${src}`}
        />
      </DialogTrigger>
      <DialogContent className={cn("max-h-screen max-w-screen-2xl")}>
        <DialogTitle className={cn("hidden")}>{alt}</DialogTitle>
        <div className={cn("relative flex w-full justify-center")}>
          <Image
            style={{
              width: "100%",
              height: "auto",
            }}
            alt={alt}
            src={`${IMAGE_URL}${src}`}
            sizes="100vw"
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
