"use client";

import { ArrowIcon } from "../app/icons/ArrowIcon";

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="btn btn-circle fixed bottom-4 right-4"
    >
      <ArrowIcon />
    </button>
  );
};
