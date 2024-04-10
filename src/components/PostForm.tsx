import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useGetPost from "../hooks/data/useGetPost";
import useCreatePost from "../hooks/data/useCreatePost";
import useUpdatePost from "../hooks/data/useUpdatePost";
import Button from "./Button";

const newPostInitialState: Post = {
  id: undefined,
  title: "",
  description: "",
};

const PostForm = ({ action = "create" }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(newPostInitialState);

  const { data: previousPost } = useGetPost(
    action === "update" ? id : undefined
  );
  const { mutateAsync: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => setPost({ ...post, [event.target.name]: event.target.value });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (action === "update") {
      updatePost(post);
    } else {
      createPost(post).then((createdPost) => navigate(`/${createdPost.id}`));
    }
  };

  useEffect(() => {
    if (action === "update") {
      setPost(previousPost ?? newPostInitialState);
    } else {
      setPost(newPostInitialState);
    }
  }, [action, previousPost]);

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{action === "update" ? "Edit the post" : "Create a post"}</h2>
      <span>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={post?.title}
          onChange={handleInputChange}
          className="input"
        />
      </span>
      <span>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={post?.description}
          onChange={handleInputChange}
          className="input"
        />
      </span>
      <div className="btn-area">
        <Button
          label={action === "update" ? "Save" : "Create"}
          type="submit"
          colorTheme={action === "update" ? "change-btn" : "create-btn"}
        />
        <Button label={"Cancel"} colorTheme="destructive-btn" />
      </div>
    </form>
  );
};

export default PostForm;
