import { getAllPostIds, getPostData } from '@/lib/post';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, tags } = await getPostData(params.id);

  return {
    title,
    description,
    keywords: tags
  };
}
export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

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
