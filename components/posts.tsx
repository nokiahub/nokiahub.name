import { Post } from "@/lib/post";
import { NextPage } from "next";
import { cn } from "@/lib/utils";

type Props = {
  items: Post[];
};

export const Posts: NextPage<Props> = ({ items }) => {
  return (
    <ol className={cn("grid grid-cols-1 md:grid-cols-3")}>
      {items.map((item) => (
        <PostCard post={item} />
      ))}
    </ol>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { id, title, description, date } = post;

  return (
    <article className="p-6">
      <h2 className="mb-2 text-xl font-bold uppercase">{title}</h2>
      <p>{description}</p>
      <a href={`/etc/${id}`} className="mt-2 block underline">
        Read →
      </a>
    </article>
  );
};
