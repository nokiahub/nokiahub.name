import { Posts } from "@/components/posts";
import { Tags } from "@/components/tags";
import { cn } from "@/lib/utils";

const getViews = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + "/posts/views", {
    method: "GET",
  });

  return response.json();
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
