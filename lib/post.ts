import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
