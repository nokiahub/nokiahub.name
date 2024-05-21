import { getAllPostIds, getPostData } from '@/lib/post';
import { Metadata } from 'next';
import Mdx from '@/app/components/Mdx';

import {  allPosts } from 'contentlayer/generated';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, tags } = await getPostData(params.slug);

  return {
    title,
    description,
    keywords: tags
  };
}

export default async function PostItem({ params }: { params: { slug: string } }) {
  const postData = allPosts.find((post) => post._id.includes(params.slug));

  return (
    <div>
      <h1 className={"text-2xl"}>{postData?.title}</h1>
      <span className={"text-sm text-gray-500"}>{postData?.date}</span>
      <div className={"mt-6"}>
        {
          postData &&
        <Mdx post={postData} />
        }
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllPostIds();
}
