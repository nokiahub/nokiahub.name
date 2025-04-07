import { getPostsData } from "@/lib/post";
import { Posts } from "@/components/posts";
import { Hero } from "@/components/hero";

const EtcPage = () => {
  const posts = getPostsData("etc");

  return (
    <>
      <Hero />
      <Posts items={posts} />
    </>
  );
};

export default EtcPage;
