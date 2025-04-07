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

export function getPostsData(filterBy?: string, tag?: string) {
  const postsDirectory = path.join(process.cwd(), "content/posts");
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
      return !filterBy || postsData.category === filterBy;
    })
    .filter((postsData) => {
      return !tag || postsData.tags.includes(tag);
    })
    .sort(compareByDate);
}

export function getAllPostIds() {
  const postsDirectory = path.join(process.cwd(), "content/posts");

  const fileNames = getFileNamesFrom(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: trimFileExtension(fileName),
      },
    };
  });
}

export async function getPostData(id: string) {
  const postsDirectory = path.join(process.cwd(), "content/posts");

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
