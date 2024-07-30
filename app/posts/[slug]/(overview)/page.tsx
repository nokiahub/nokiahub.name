import { getAllPostIds, getPostData } from "@/lib/post";
import { Metadata } from "next";
import MdxComponents from "@/components/mdx/mdx-components";

import { allPosts } from "contentlayer/generated";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, tags } = await getPostData(params.slug);

  return {
    title,
    description,
    keywords: tags,
  };
}

export default async function PostItem({ params }: Props) {
  return (
    <>
      <PostSummary name={params.slug} />
      <PostContent name={params.slug} />
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

export async function generateStaticParams() {
  return getAllPostIds();
}
