import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { devTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";
import { TagsWithCount } from "@/components/tags-with-count";

export type TagItem = {
  name: string;
  href: string;
};

const PostsPage = async () => {
  const posts = getPostsData("dev");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <TagsWithCount items={devTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;
