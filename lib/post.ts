import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog/dev');

export type Post = {
  id: string;
  category: string;
  published: boolean;
  date: string;
  title: string;
  description: string;
  tags: string[];
};
export function getPostsData() {
  const directoryNames = fs.readdirSync(postsDirectory);
  return directoryNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const filePath = path.join(fullPath, 'index.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data
    } as Post;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}`);
  const filePath = path.join(fullPath, 'index.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data
  } as Post & { contentHtml: string };
}
