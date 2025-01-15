"use client";

import Link from "next/link";
import Nav from "@/components/nav";
import Burger from "@/components/burger";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setIsHidden(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between border-b border-border/45 bg-background px-6 py-3",
        isHidden ? "invisible" : "",
      )}
    >
      <Link className={"text-end text-xl"} href={"/"}>
        nokia&apos;s blog
      </Link>
      <div className={cn("hidden md:block")}>
        <Nav />
      </div>
      <div className={cn("block md:hidden")}>
        <Burger />
      </div>
    </div>
  );
};
