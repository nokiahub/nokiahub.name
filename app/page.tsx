import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { getPostsData } from "@/lib/post";
import { TagsWithCount } from "@/components/tags-with-count";
import { devTags } from "@/consts/tags";

export default async function Page() {
  const posts = getPostsData("dev");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <TagsWithCount items={devTags} />
      <Posts items={posts} />
    </div>
  );
}
