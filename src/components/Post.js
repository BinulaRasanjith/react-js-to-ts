import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(`/${post.id}`);
  };

  return (
    <div className="post" onClick={handleClick}>
      {post.title}
    </div>
  );
};

export default Post;
