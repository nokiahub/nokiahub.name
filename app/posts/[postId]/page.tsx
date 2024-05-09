import { getAllPostIds, getPostData } from '@/lib/post';
import { Metadata } from 'next';

type Props = {
  params: { postId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, tags } = await getPostData(params.postId);

  return {
    title,
    description,
    keywords: tags
  };
}
export default async function Post({ params }: { params: { postId: string } }) {
  const postData = await getPostData(params.postId);

  return (
    <div>
      <div>{postData.title}</div>
      <div>{postData.date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export async function generateStaticParams() {
  return getAllPostIds();
}
