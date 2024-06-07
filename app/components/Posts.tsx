import { Post } from "@/lib/post";
import { NextPage } from "next";
import Link from "next/link";

type PostsProps = {
  posts: Post[];
};

export const Posts: NextPage<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li className={"mb-4 list-none"} key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { id, title, description, date } = post;

  return (
    <Link className={"card card-bordered"} href={`/posts/${id}`}>
      <div className={"card-body"}>
        <h2 className={"card-title"}>{title}</h2>
        <p>{description}</p>
        <p className={"text-sm text-gray-400"}>{date}</p>
      </div>
    </Link>
  );
};
