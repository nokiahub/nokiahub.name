import { getAllPostIds, getPostData } from '../../../lib/post';

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
