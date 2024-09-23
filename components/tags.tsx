import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { getAllTags } from "@/lib/post";

type Props = {
  currentTag?: string;
};

export function Tags({ currentTag = "all" }: Props) {
  return (
    <div className="flex flex-wrap gap-3 self-center">
      {getAllTags().map((tag) => (
        <Link href={`/posts/tag/${tag}`} key={tag}>
          <Badge
            className={cn("cursor-pointer")}
            variant={currentTag === tag ? "default" : "secondary"}
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
