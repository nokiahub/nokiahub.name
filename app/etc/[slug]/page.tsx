import { getAllPostIds, getPostData, getPostsData } from "@/lib/post";
import { Metadata } from "next";
import MdxComponents from "@/components/mdx/mdx-components";

import { allPosts } from "contentlayer/generated";

import { URLSearchParams } from "url";

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

export default async function PostItem({ params }: Props) {
  const rawPost = await getPostData(params.slug);
  const tag = rawPost.tags.filter((tag) => tag !== "all")[0];

  return (
    <>
      <h1 className={"text-2xl font-bold"}>{rawPost?.title}</h1>
      <span className={"text-sm text-zinc-600"}>{rawPost?.date}</span>
      <PostContent name={params.slug} />
      <RelatedPosts tag={tag} currentPostSlug={params.slug} />
    </>
  );
}

const RelatedPosts = async ({
  tag,
  currentPostSlug,
}: {
  tag: string;
  currentPostSlug: string;
}) => {
  const relatedPosts = getPostsData(tag).filter(
    (post) => post.id !== currentPostSlug,
  );

  return (
    <div className={"mt-6"}>
      <h2 className={"text-xl font-bold"}>Related Posts</h2>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostContent = ({ name }: { name: string }) => {
  const postForMdx = allPosts.find((post) => post._id.includes(name));

  return (
    <article className={"prose mt-6 dark:prose-invert"}>
      {postForMdx && <MdxComponents post={postForMdx} />}
    </article>
  );
};

export async function generateStaticParams() {
  return getAllPostIds();
}
