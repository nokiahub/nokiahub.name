import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { etcTagNames, etcTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";
import { TagsWithCount } from "@/components/tags-with-count";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  const posts = getPostsData("etc", decodeURI(params.tag));

  return (
    <div className={cn("flex flex-col gap-12")}>
      <TagsWithCount items={etcTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return etcTagNames;
}
