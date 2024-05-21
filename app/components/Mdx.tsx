import { useMDXComponent } from 'next-contentlayer/hooks';

type Props = {
  post: {
    body: {
      code: string;
    };
  }
}
export default function Mdx({ post }: Props) {
  const MDXComponent = useMDXComponent(post?.body?.code || '');

  return (
    <>
      <MDXComponent />
    </>
  )
}