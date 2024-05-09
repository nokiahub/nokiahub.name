import { Post } from '@/lib/post';
import { NextPage } from 'next';
import Link from 'next/link';

type ProjectsProps = {
  items: Post[];
};

export const Projects: NextPage<ProjectsProps> = ({ items }: ProjectsProps) => {
  return (
    <ul>
      {items.map((post) => (
        <li className={'mb-2 list-none'} key={post.id}>
          <Link href={`/projects/${post.id}`}>
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
