import { Link, useParams } from "react-router-dom";

const Post = ({ post }) => {
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
