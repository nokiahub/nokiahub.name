import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Mdx({ post }) {
  const MDXComponent = useMDXComponent(post?.body?.code || '');

  return (
    <>
      <MDXComponent />
    </>
  )
}