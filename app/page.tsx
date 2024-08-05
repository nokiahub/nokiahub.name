import { getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";

export default function Page() {
  const posts = getPostsData();

  console.log(posts);

  return <Posts posts={posts} />;
}
