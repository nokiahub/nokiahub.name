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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-expect-error*/}
      <MDXComponent components={mdxComponents} />
    </>
  );
}
