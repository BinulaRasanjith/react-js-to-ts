import { useParams } from "react-router-dom";
import useGetPost from "../hooks/data/useGetPost";

const PostDetail = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useGetPost(id);

  console.log(post);

  return (
    !isLoading && (
      <div className="post-detail">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    )
  );
};

export default PostDetail;
