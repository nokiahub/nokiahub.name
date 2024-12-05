import { Post } from "@/lib/post";
import { NextPage } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {
  items: Post[];
};

export const Posts: NextPage<Props> = ({ items }) => {
  return (
    <ol className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
      {items.map((item) => (
        <li className={"list-none"} key={item.id}>
          <PostCard post={item} />
        </li>
      ))}
    </ol>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { id, title, description, date } = post;

  return (
    <Link href={`/posts/${id}`}>
      <Card className={"rounded-sm hover:border-foreground"}>
        <CardHeader>
          <h2 className={"line-clamp-2 h-[2lh] font-bold"}>{title}</h2>
        </CardHeader>
        <CardContent className={"line-clamp-4 h-[4lh]"}>
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <CardDescription>{date.split("-").join(".")}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};
