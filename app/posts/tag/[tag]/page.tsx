import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { getAllTags } from "@/lib/post";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Tags currentTag={decodeURI(params.tag)} />
      <Posts filterBy={decodeURI(params.tag)} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return getAllTags();
}
