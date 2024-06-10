import { Post } from "@/lib/post";
import { NextPage } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

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
    <Link href={`/posts/${id}`}>
      <Card>
        <CardHeader>
          <h2 className={"font-bold"}>{title}</h2>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
