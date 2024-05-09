import { Post } from '../../lib/post';
import { NextPage } from 'next';
import Link from 'next/link';

type PostsProps = {
  posts: Post[];
};

export const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li className={'mb-2 list-none'}>
          <Link href={`/posts/${post.id}`}>
            <div>{post.id}</div>
            <div>{post.category}</div>
            <div>{post.published}</div>
            <div>{post.date}</div>
            <div>{post.title}</div>
            <div>{post.description}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
