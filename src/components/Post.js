import { useNavigate, useParams } from "react-router-dom";

const Post = ({ post }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(`/${post.id}`);
  };

  return (
    <div
      className={`post ${id === post.id ? "post-selected" : "post-hover"}`}
      onClick={handleClick}
    >
      {post.title}
    </div>
  );
};

export default Post;
