import { getPostsData } from '../../lib/post';
import { Posts } from '../components/Posts';

const PostsPage = () => {
  const posts = getPostsData();

  return <Posts posts={posts} />;
};

export default PostsPage;
