import { getPostData } from "@/lib/post";
import { allPosts } from "contentlayer/generated";
import MdxComponents from "@/components/mdx/mdx-components";
import Views from "@/app/posts/[slug]/components/Views";

type Props = {
  name: string;
};
export function Post({ name }: Props) {
  return (
    <>
      <Views name={name} />
      <PostSummary name={name} />
      <PostContent name={name} />
    </>
  );
}

const PostSummary = async ({ name }: { name: string }) => {
  const rawPost = await getPostData(name);

  return (
    <>
      <h1 className={"text-2xl font-bold"}>{rawPost?.title}</h1>
      <span className={"text-sm text-zinc-600"}>{rawPost?.date}</span>
    </>
  );
};

const PostContent = ({ name }: { name: string }) => {
  const postForMdx = allPosts.find((post) => post._id.includes(name));

  return (
    <article className={"prose mt-6 dark:prose-invert"}>
      {postForMdx && <MdxComponents post={postForMdx} />}
    </article>
  );
};
