import { getAllPostIds, getPostData } from "@/lib/post";
import { Metadata } from "next";
import MdxComponents from "@/components/mdx/mdx-components";

import { allPosts } from "contentlayer/generated";

import { URLSearchParams } from "url";

type Props = {
  params: { slug: string };
  searchParams: URLSearchParams;
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
  const rawPost = await getPostData(params.slug);

  return (
    <div className={"prose mt-6 dark:prose-invert"}>
      <h1 className={"break-words"}>{rawPost?.title}</h1>
      <p>{rawPost?.date}</p>
      <PostContent name={params.slug} />
    </div>
  );
}

const PostContent = ({ name }: { name: string }) => {
  const postForMdx = allPosts.find((post) => post._id.includes(name));

  return postForMdx && <MdxComponents post={postForMdx} />;
};

export async function generateStaticParams() {
  return getAllPostIds();
}
