"use client";

import { Button } from "@/components/ui/button";
import { MoveUp } from "lucide-react";

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
      aria-label={"scroll to top"}
      className="fixed bottom-4 right-4 size-10 rounded-full p-0"
    >
      <MoveUp />
    </Button>
  );
};
