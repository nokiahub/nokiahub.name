import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { devTags } from "@/consts/tags";

export type TagItem = {
  name: string;
  href: string;
};

const PostsPage = async () => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts />
    </div>
  );
};

export default PostsPage;
