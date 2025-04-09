import { getPostData } from "@/lib/post";
import { Metadata } from "next";

import { URLSearchParams } from "url";
import { cn } from "@/lib/utils";
import path from "path";
import fs from "fs";

type Props = {
  params: { slug: string };
  searchParams: URLSearchParams;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description, tags } = await getPostData(params.slug);

  return {
    title,
    description,
    keywords: tags,
  };
}

function formatKoreanDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

export default async function PostItem({ params }: Props) {
  const rawPost = await getPostData(params.slug);

  return (
    <div className={"prose mt-6 dark:prose-invert"}>
      <h1 className={"mb-2 text-4xl font-bold md:text-5xl"}>
        {rawPost?.title}
      </h1>
      <p
        className={cn(
          "border-b border-black pb-2 text-sm uppercase text-gray-700",
        )}
      >
        {formatKoreanDate(rawPost?.date)} · {rawPost.tags?.join(" · ")}
      </p>
      <PostContent name={params.slug} />
    </div>
  );
}

const PostContent = async ({ name }: { name: string }) => {
  const postForMdx = await getPostData(name);
  console.log(postForMdx);
  // return postForMdx && <MdxComponents post={postForMdx} />;
  return (
    <div dangerouslySetInnerHTML={{ __html: postForMdx.contentHtml }}></div>
  );
};

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.[^/.]+$/, ""),
      },
    };
  });
}
