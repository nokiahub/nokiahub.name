'use client';

import { ArrowIcon } from '../icons/ArrowIcon';

export const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button className={style} onClick={scrollToTop} aria-label={"Scroll to top"}>
      <ArrowIcon />
    </button>
  );
};

const style =
  'flex justify-center items-center fixed bottom-4 right-4 cursor-pointer z-10 border-[1px] border-textLight size-9 rounded-full';
