import { Posts } from "@/components/posts";
import { cn } from "@/lib/utils";
import { Tags } from "@/components/tags";

// TODO: remove duplication
import prisma from "@/lib/prisma.server";

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

export default async function Page() {
  const views = await getViews();

  return (
    <div className={cn("flex flex-col gap-12")}>
      <Tags />
      <Posts views={views} />
    </div>
  );
}
