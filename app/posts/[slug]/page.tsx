import { getAllPostIds, getPostData } from "@/lib/post";
import { Metadata } from "next";
import MdxComponents from "@/app/components/mdx/mdx-components";

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

export default async function PostItem({
  params,
}: {
  params: { slug: string };
}) {
  const postData = allPosts.find((post) => post._id.includes(params.slug));

  return (
    <div>
      <h1 className={"text-2xl"}>{postData?.title}</h1>
      <span className={"text-sm text-gray-500"}>{postData?.date}</span>
      <article className={"prose mt-6 dark:prose-invert"}>
        {postData && <MdxComponents post={postData} />}
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllPostIds();
}
