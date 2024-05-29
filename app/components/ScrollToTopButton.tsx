"use client";

import { ArrowIcon } from "../icons/ArrowIcon";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={
        "border-textLight fixed bottom-4 right-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border-[1px]"
      }
      onClick={scrollToTop}
      aria-label={"Scroll to top"}
    >
      <ArrowIcon />
    </button>
  );
};
