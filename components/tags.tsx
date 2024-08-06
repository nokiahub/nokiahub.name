import { Badge } from "@/components/ui/badge";

import { getAllTags } from "@/lib/post";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  currentTag?: string;
};

export function Tags({ currentTag }: Props) {
  const tags = getAllTags();

  return (
    <div className="flex flex-wrap gap-4 self-center">
      {tags.map((tag) => (
        <Link href={`/posts/tag/${tag}`} key={tag}>
          <Badge
            className={cn("cursor-pointer")}
            variant={currentTag === tag ? "secondary" : undefined}
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
