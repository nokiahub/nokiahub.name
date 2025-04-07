import { getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";

const EtcPage = () => {
  const posts = getPostsData("etc");

  return <Posts items={posts} />;
};

export default EtcPage;
