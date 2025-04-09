import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type Post = {
  id: string;
  category: string;
  published: boolean;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

export const getMatterFrom = (ContentPath: string, fileName: string) => {
  const fullPath = path.join(ContentPath, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
};

export async function getPostData(
  id: string,
): Promise<Post & { contentHtml: string }> {
  const postsDir = path.join(process.cwd(), "content/posts");
  const { data, content } = getMatterFrom(postsDir, `${id}.md`);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...data,
  };
}
