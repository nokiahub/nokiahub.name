import { getPostData } from "@/lib/post";
import { Metadata } from "next";

import { URLSearchParams } from "url";
import { cn } from "@/lib/utils";
import path from "path";
import fs from "fs";
import { Toc } from "@/components/toc";

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
    <div className={"justify-round flex w-screen dark:prose-invert"}>
      {/*<Toc />*/}
      <main className={cn("flex w-full justify-center")}>
        <div className={cn("w-full pt-10")}>
          <h1 className={"mb-2 px-6 text-4xl font-bold md:text-5xl"}>
            {rawPost?.title}
          </h1>
          <p
            className={cn(
              "border-b border-black px-6 pb-2 text-sm uppercase text-gray-700",
            )}
          >
            {formatKoreanDate(rawPost?.date)} · {rawPost.tags?.join(" · ")}
          </p>
          <PostContent name={params.slug} />
        </div>
      </main>
    </div>
  );
}

const PostContent = async ({ name }: { name: string }) => {
  const postForMdx = await getPostData(name);
  return (
    <div
      className={cn("px-6 pb-20")}
      dangerouslySetInnerHTML={{ __html: postForMdx.contentHtml }}
    ></div>
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
