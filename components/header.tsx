"use client";

import Link from "next/link";

export const Header = () => {
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
