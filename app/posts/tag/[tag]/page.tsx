import { Posts } from "@/components/posts";
import { devTagNames, devTags } from "@/consts/tags";
import { getPostsData } from "@/lib/post";
import { TagsWithCount } from "@/components/tags-with-count";
import { cn } from "@/lib/utils";

type Props = {
  params: { tag: string };
};
const PostsPage = ({ params }: Props) => {
  const posts = getPostsData("dev", decodeURI(params.tag));

  return (
    <div className={cn("flex flex-col gap-12")}>
      <TagsWithCount items={devTags} />
      <Posts items={posts} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return devTagNames;
}
