import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { Tag, Tags } from "@/components/tags";
import { devTags } from "@/consts/tags";

export default async function Page() {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts />
    </div>
  );
}
