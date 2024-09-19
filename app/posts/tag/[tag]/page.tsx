import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import { getAllTags } from "@/lib/post";
import prisma from "@/lib/prisma.server";

type Props = {
  params: { tag: string };
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const getViews = async () => {
  let posts;
  try {
    posts = await prisma.post.findMany({
      select: {
        slug: true,
        views: true,
      },
    });
  } catch (error) {
    console.error(error);
  }

  if (!posts) {
    return {};
  }

  // return like this:
  // { "slug": 0, "slug2": 0, "slug3": 0 ... }
  return Object.fromEntries(
    posts.map((post: { slug: string; views: number }) => [
      post.slug,
      post.views,
    ]),
  );
};

const PostsPage = async ({ params }: Props) => {
  const views = await getViews();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Tags currentTag={decodeURI(params.tag)} />
      <Posts views={views} filterBy={decodeURI(params.tag)} />
    </div>
  );
};

export default PostsPage;

export async function generateStaticParams() {
  return getAllTags();
}
