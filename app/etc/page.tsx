import { getMatterFrom, Post } from "@/lib/post";
import { Posts } from "@/components/posts";
import { Hero } from "@/components/hero";
import path from "path";
import fs from "fs";
import { cn } from "@/lib/utils";

function getPostsData(filterBy?: string, tag?: string): Post[] {
  const postsDir = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDir);

  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.[^/.]+$/, "");
    const { data } = getMatterFrom(postsDir, fileName);
    return { id, ...data } as Post;
  });

  return posts
    .filter((post) => !filterBy || post.category === filterBy)
    .filter((post) => !tag || post.tags.includes(tag))
    .sort((a: Post, b: Post): number => b.date.localeCompare(a.date));
}

const EtcPage = () => {
  const posts = getPostsData("etc");

  return (
    <main className={"flex justify-center py-8"}>
      <div className={cn("w-full max-w-[960px] px-4 pb-20")}>
        <Hero />
        <Posts items={posts} />
      </div>
    </main>
  );
};

export default EtcPage;
