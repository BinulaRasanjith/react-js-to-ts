import { Link, useParams } from "react-router-dom";

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { id } = useParams();

  return (
    <Link
      to={`/${post.id}`}
      className={`post ${id === post.id ? "post-selected" : "post-hover"}`}
    >
      {post.title}
    </Link>
  );
};

export default Post;
