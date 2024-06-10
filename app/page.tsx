import { getPostsData } from "@/lib/post";
import { Posts } from "../components/Posts";

export default function Page() {
  const posts = getPostsData();

  return <Posts posts={posts} />;
}
