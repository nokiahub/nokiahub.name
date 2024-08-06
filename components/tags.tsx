import { Badge } from "@/components/ui/badge";

import { getAllTags } from "@/lib/post";
import { cn } from "@/lib/utils";

export function Tags() {
  const tags = getAllTags();

  return (
    <div className="flex flex-wrap gap-4 self-center">
      {tags.map((tag) => (
        <Badge className={cn("cursor-pointer")} key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
