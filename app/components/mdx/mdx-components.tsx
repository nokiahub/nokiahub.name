import { useMDXComponent } from "next-contentlayer/hooks";
import { Pre } from "@/app/components/mdx/mdx-pre";

type Props = {
  post: {
    body: {
      code: string;
    };
  };
};

const mdxComponents = {
  pre: Pre,
};
export default function MdxComponents({ post }: Props) {
  const MDXComponent = useMDXComponent(post?.body?.code || "");

  return (
    <>
      <MDXComponent components={mdxComponents} />
    </>
  );
}
