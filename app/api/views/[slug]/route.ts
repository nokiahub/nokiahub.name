import { NextRequest } from "next/server";
import prisma from "@/lib/prisma.server";
import { z } from "zod";

const schema = z.object({
  params: z.object({
    slug: z.string(),
  }),
});

export async function POST(req: NextRequest, context: z.infer<typeof schema>) {
  const { slug } = context.params;

  await prisma.post.update({
    where: { slug },
    data: { views: { increment: 1 } },
  });

  return new Response("", { status: 200 });
}
