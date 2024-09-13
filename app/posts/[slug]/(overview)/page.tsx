import { getAllPostIds, getPostData } from "@/lib/post";
import { Metadata } from "next";

import { URLSearchParams } from "url";
import { Post } from "@/app/posts/[slug]/components/Post";

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
  return <Post name={params.slug} />;
}

export async function generateStaticParams() {
  return getAllPostIds();
}
