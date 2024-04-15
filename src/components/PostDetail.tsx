import { useParams, useNavigate } from "react-router-dom";
import useGetPost from "../hooks/data/useGetPost";
import useDeletePost from "../hooks/data/useDeletePost";
import Button from "./Button";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: post, isLoading } = useGetPost(id);
  const { mutate: deletePost } = useDeletePost();

  const handleEdit: React.MouseEventHandler<HTMLButtonElement> = (event) =>
    navigate(`/update-post/${id}`);

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (id) {
      deletePost(id);
      navigate("/");
    }
  };

  return (
    !isLoading && (
      <div className="post-detail">
        <h2>{post?.title}</h2>
        <p>{post?.description}</p>

        {/* BUTTON AREA */}
        <div className="btn-area">
          <Button label="Edit" colorTheme="change-btn" onClick={handleEdit} />
          <Button
            label="Delete"
            colorTheme="destructive-btn"
            onClick={handleDelete}
          />
        </div>
      </div>
    )
  );
};

export default PostDetail;
