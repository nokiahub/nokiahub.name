"use client";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Tag({ name, href, count }) {
  const pathname = usePathname();

  return (
    <Link href={href} key={name}>
      <Badge
        className={cn("relative cursor-pointer")}
        variant={href === decodeURI(pathname) ? "default" : "secondary"}
      >
        {name}
        <span
          className={cn("p-0.5 pb-1.5 pr-0 text-[0.7em] opacity-80")}
        >{`(${count})`}</span>
      </Badge>
    </Link>
  );
}
