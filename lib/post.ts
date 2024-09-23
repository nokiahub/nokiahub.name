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

const postsDirectory = path.join(process.cwd(), "content/posts");

const compareByDate = (a: Post, b: Post) => {
  if (a.date < b.date) {
    return 1;
  } else {
    return -1;
  }
};

const getFileNamesFrom = (contentPath: string) => {
  return fs.readdirSync(contentPath);
};

const trimFileExtension = (fileName: string) => {
  return fileName.replace(/\.[^/.]+$/, "");
};

const getMatterFrom = (ContentPath: string, fileName: string) => {
  const fullPath = path.join(ContentPath, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
};

export function getPostsData(filterBy?: string) {
  const directoryNames = getFileNamesFrom(postsDirectory);
  const postsData = directoryNames.map((fileName) => {
    const id = trimFileExtension(fileName);
    const matterResult = getMatterFrom(postsDirectory, fileName);
    return {
      id,
      ...matterResult.data,
    } as Post;
  });

  return postsData
    .filter((postsData) => {
      return !filterBy || postsData.tags.includes(filterBy);
    })
    .sort(compareByDate);
}

export function getAllPostIds() {
  const fileNames = getFileNamesFrom(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: trimFileExtension(fileName),
      },
    };
  });
}

export function getAllTags() {
  const tags = [
    "all",
    "blog making",
    "git",
    "react",
    "nextjs",
    "remix",
    "web",
    "typescript",
    "javascript",
  ];

  return tags.sort();
}

export async function getPostData(id: string) {
  const matterResult = getMatterFrom(postsDirectory, `${id}.mdx`);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  } as Post & { contentHtml: string };
}
