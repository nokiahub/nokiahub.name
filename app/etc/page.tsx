import { getMatterFrom, Post } from "@/lib/post";
import { Posts } from "@/components/posts";
import { Hero } from "@/components/hero";
import path from "path";
import fs from "fs";

const compareByDate = (a: Post, b: Post): number =>
  b.date.localeCompare(a.date);
export function getPostsData(filterBy?: string, tag?: string): Post[] {
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
    .sort(compareByDate);
}

const EtcPage = () => {
  const posts = getPostsData("etc");

  return (
    <>
      <Hero />
      <Posts items={posts} />
    </>
  );
};

export default EtcPage;
