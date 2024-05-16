import { getProjectData } from '@/lib/post';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const data = await getProjectData(params.slug);

  return (
    <div>
      <div>{data.title}</div>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  );
}
