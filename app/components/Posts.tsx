import { Post } from '@/lib/post';
import { NextPage } from 'next';
import Link from 'next/link';

type PostsProps = {
  posts: Post[];
};

export const Posts: NextPage<PostsProps> = ({ posts }: PostsProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li className={'mb-8 list-none'} key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  const { id, title, description } = post;

  return (
    <Link href={`/posts/${id}`} >
      <h2 className={"text-xl mb-2"}>{title}</h2>
      <h3>{description}</h3>
    </Link>
  );
}
