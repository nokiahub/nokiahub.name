import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";
import prisma from "@/lib/prisma.server";

const getViews = async () => {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      views: true,
    },
  });

  console.log("prisma get views");

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
  console.log(views);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Tags />
      <Posts />
    </div>
  );
};

export default PostsPage;
