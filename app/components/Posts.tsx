import { Post } from '../../lib/post';
import { NextPage } from 'next';

type PostsProps = {
  posts: Post[];
};

export const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <li className={'mb-2 list-none'}>
          <div>{post.id}</div>
          <div>{post.category}</div>
          <div>{post.published}</div>
          <div>{post.date}</div>
          <div>{post.title}</div>
          <div>{post.description}</div>
        </li>
      ))}
    </div>
  );
};
