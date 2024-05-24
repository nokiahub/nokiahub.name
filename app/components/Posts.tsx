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
  const { id, title, description, date } = post;

  return (
    <Link className={'no-underline'} href={`/posts/${id}`} >
      <h2 className={"text-xl mb-2 font-bold"}>{title}</h2>
      <p>{description}</p>
      <p className={'text-sm text-gray-400'}>{date}</p>
    </Link>
  );
}
