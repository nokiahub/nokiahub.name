import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";

const PostsPage = () => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags />
      <Posts />
    </div>
  );
};

export default PostsPage;
