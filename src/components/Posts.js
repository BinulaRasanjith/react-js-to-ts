import useGetPost from "../hooks/data/useGetPost";
import useGetPosts from "../hooks/data/useGetPosts";
import Post from "./Post";

const Posts = () => {
  const { data: posts } = useGetPosts();

  return (
    <div className="posts-container">
      {posts && posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
