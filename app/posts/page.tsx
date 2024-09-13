import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma.server";

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

  // return like this:
  // { "slug": 0, "slug2": 0, "slug3": 0 ... }
  return Object.fromEntries(
    posts.map((post: { slug: string; views: number }) => [
      post.slug,
      post.views,
    ]),
  );
};

const PostsPage = async () => {
  const views = await getViews();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Tags />
      <Posts views={views} />
    </div>
  );
};

export default PostsPage;
