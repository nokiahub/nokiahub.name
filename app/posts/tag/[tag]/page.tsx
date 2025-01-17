import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { devTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  const posts = getPostsData("dev", decodeURI(params.tag));

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return [
    "all",
    "blog making",
    "git",
    "react",
    "nextjs",
    "remix",
    "web",
    "typescript",
    "javascript",
  ];
}
