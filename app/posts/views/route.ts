// get all posts views from the database
import prisma from "@/lib/prisma.server";

export async function GET() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      views: true,
    },
  });

  // return like this:
  // { "slug": 0, "slug2": 0, "slug3": 0 ... }
  const viewsBySlug = Object.fromEntries(
    posts.map((post: { slug: string; views: number }) => [
      post.slug,
      post.views,
    ]),
  );

  return new Response(JSON.stringify(viewsBySlug));
}
