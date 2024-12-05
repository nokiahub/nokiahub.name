import { Tags } from "@/components/tags";
import { etcTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";

const EtcPage = () => {
  const posts = getPostsData("etc");

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={etcTags} />
      <Posts items={posts} />
    </div>
  );
};

export default EtcPage;
