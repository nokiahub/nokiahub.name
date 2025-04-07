import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { getPostsData } from "@/lib/post";

export type TagItem = {
  name: string;
  href: string;
};

const PostsPage = async () => {
  const posts = getPostsData("dev");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;
