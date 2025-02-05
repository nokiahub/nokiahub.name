import { getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { TagsWithCount } from "@/components/tags-with-count";
import { etcTags } from "@/consts/tags";

const EtcPage = () => {
  const posts = getPostsData("etc");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <TagsWithCount items={etcTags} />
      <Posts items={posts} />
    </div>
  );
};

export default EtcPage;
