import { getAllTags, getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";

const PostsPage = () => {
  const posts = getPostsData();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Tags />
      <Posts posts={posts} />
    </div>
  );
};

export default PostsPage;
