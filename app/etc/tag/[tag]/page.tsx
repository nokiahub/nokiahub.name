import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { etcTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  const posts = getPostsData("etc", decodeURI(params.tag));

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={etcTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return ["travel"];
}
