import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma.server";
import { getAllPostIds } from "@/lib/post";

const db = new PrismaClient();

// if there is slug already, don't update views.
// if there is no slug, create one with 0 views.
async function main() {
  const allPostIds = getAllPostIds();
  const allPostSlugs = allPostIds.map((post) => post.params.id);
  const allPosts = await db.post.findMany();
  const allPostSlugsInDb = allPosts.map((post: { slug: string }) => post.slug);
  const newPosts = allPostSlugs.filter(
    (slug) => !allPostSlugsInDb.includes(slug),
  );

  for (const slug of newPosts) {
    await db.post.create({
      data: {
        slug,
        views: 0,
      },
    });
  }

  console.log("Seed complete");
  console.log("New posts added:", newPosts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
