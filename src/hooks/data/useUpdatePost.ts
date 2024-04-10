import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";

const updatePost = (updatedPost: Post) =>
  api.patch(`/posts/${updatedPost.id}`, updatedPost).then((res) => res.data);

const useUpdatePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (updatedPost: Post) => {
    // get previous post data
    const previousPost = queryClient.getQueryData([
      "posts",
      updatedPost.id,
    ]) as Post;

    // optimistically update the cache
    queryClient.setQueryData(["posts", updatedPost.id], updatedPost);

    // return the previous post to the context
    return previousPost;
  };

  const handleSuccess = (data: Post, updatedPost: Post, previousPost: Post) => {
    console.log("update-success", { data, updatedPost, previousPost });

    // add the updated post to the cache & on success invalidate the queries
    queryClient.setQueryData(["posts", updatedPost.id], updatedPost);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (
    error: any,
    updatedPost: Post,
    previousPost: Post = {} as Post
  ) => {
    console.log("update-error", { error, updatedPost, previousPost });

    // on error revert the cache to the previous data & invalidate the queries
    queryClient.setQueryData(["posts", updatedPost.id], previousPost);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return useMutation({
    mutationFn: updatePost,
    onMutate: handleMutate,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useUpdatePost;
