"use client";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { TagItem } from "@/app/posts/page";
import { usePathname } from "next/navigation";

type Props = {
  items: TagItem[];
};
export function Tags({ items }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-3 self-center">
      {items.map(({ href, name }) => (
        <Link href={href} key={name}>
          <Badge
            className={cn("cursor-pointer")}
            variant={href === decodeURI(pathname) ? "default" : "secondary"}
          >
            {name}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

export function Tag({ tag, href }: { tag: string; href: string }) {
  return (
    <Link href={href}>
      <Badge className={cn("cursor-pointer")}>{tag}</Badge>
    </Link>
  );
}
