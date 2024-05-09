import { getProjectData } from '../../../lib/post';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const data = await getProjectData(params.id);

  return (
    <div>
      <div>{data.title}</div>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </div>
  );
}
