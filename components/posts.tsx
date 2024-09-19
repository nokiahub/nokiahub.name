import { getPostsData, Post } from "@/lib/post";
import { NextPage } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  filterBy?: string;
  views: Record<string, number>;
};

export const Posts: NextPage<Props> = ({ filterBy, views }) => {
  const posts = getPostsData(filterBy);

  return (
    <ol className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
      {posts.map((post) => (
        <li className={"list-none"} key={post.id}>
          <PostCard post={post} views={views[post.id]} />
        </li>
      ))}
    </ol>
  );
};

const PostCard = ({ post, views }: { post: Post; views: number }) => {
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
          <CardDescription className={cn("flex w-full justify-between")}>
            <span>{date.split("-").join(".")}</span>
            <span className={cn("flex items-center gap-1")}>
              <Eye size={16} />
              {views}
            </span>
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};
