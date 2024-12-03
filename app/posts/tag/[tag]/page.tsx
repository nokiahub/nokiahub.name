import { Posts } from "@/components/posts";
import { Tag, Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { devTags } from "@/consts/tags";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags items={devTags} />
      <Posts filterBy={decodeURI(params.tag)} />
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
