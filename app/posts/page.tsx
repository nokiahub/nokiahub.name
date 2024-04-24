export default function Posts() {
  const posts = [
    {
      title: 'Hello, world!'
    }
  ];
  return (
    <div>
      <ol className={'list-none'}>
        {posts.map((post) => (
          <li>
            <div className={'my-4'}>
              <div className={'mb-2'}>
                <title className={'text-lg mb-1 mt-2'}>{post.title}</title>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
