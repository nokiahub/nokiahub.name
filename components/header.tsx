"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      return setIsHidden(false);
    }

    setIsHidden(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, handleScroll]);

  return (
    <header className="flex items-center justify-between border-b border-black px-4 py-2 text-xs uppercase tracking-widest">
      <Link href={"/"}>nokia.blog</Link>
      <nav className="space-x-3">
        <Link href="/etc" className="hover:underline">
          Archives
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
};
