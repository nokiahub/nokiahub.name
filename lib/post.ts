import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

type Post = {
  id: string;
  category: string;
  published: boolean;
  date: string;
  title: string;
  description: string;
  tags: string[];
};

const postsDirectory = path.join(process.cwd(), "content/posts");

const compareByDate = (a: any, b: any) => {
  if (a.date < b.date) {
    return 1;
  } else {
    return -1;
  }
};

const removeMdExtension = (fileName: string) => {
  return fileName.replace(/\.mdx$/, "");
};

const getMatterFrom = (ContentPath: string, fileName: string) => {
  const fullPath = path.join(ContentPath, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
};

export function getPostsData() {
  const directoryNames = fs.readdirSync(postsDirectory);
  const postsData = directoryNames.map((fileName) => {
    const id = removeMdExtension(fileName);
    const matterResult = getMatterFrom(postsDirectory, fileName);

    return {
      id,
      ...matterResult.data,
    } as Post;
  });

  return postsData.sort(compareByDate);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: removeMdExtension(fileName),
      },
    };
  });
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
