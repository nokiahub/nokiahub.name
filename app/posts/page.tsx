import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { devTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";

export type TagItem = {
  name: string;
  href: string;
};

const PostsPage = async () => {
  const posts = getPostsData("dev");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;
