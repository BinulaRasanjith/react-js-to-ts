import useGetPosts from "../hooks/data/useGetPosts";
import FloatingButton from "./FloatingButton";
import Post from "./Post";

const Posts = () => {
  const { data: posts } = useGetPosts();

  return (
    <div className="posts-container">
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      <FloatingButton />
    </div>
  );
};

export default Posts;
