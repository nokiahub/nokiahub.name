"use client";

import { ArrowIcon } from "@/app/icons/ArrowIcon";
import { Button } from "@/components/ui/button";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant={"outline"}
      className="fixed bottom-4 right-4 size-10 rounded-full p-0"
    >
      <ArrowIcon />
    </Button>
  );
};
