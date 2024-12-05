import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { Tags } from "@/components/tags";
import { devTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";

export default async function Page() {
  const posts = getPostsData("dev");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts items={posts} />
    </div>
  );
}
