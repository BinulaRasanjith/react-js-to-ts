import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";

const createPost = (newPost) =>
  api.post("/posts", newPost).then((res) => res.data);

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (newPost) => {
    // get the previous posts
    const previousPosts = queryClient.getQueryData(["posts"]);

    const mockId = Date.now();

    // add the new post to the cache
    queryClient.setQueryData(["posts"], (previousPosts) => [
      ...previousPosts,
      { ...newPost, id: mockId },
    ]);

    // return the context
    return { previousPosts, mockId };
  };

  const handleSuccess = (data, newPost, { previousPosts, mockId }) => {
    console.log("create-success", {
      data,
      newPost,
      context: { previousPosts, mockId },
    });

    // remove cached post with mock id
    queryClient.removeQueries(["posts", mockId]);

    // TODO: add the new post to the cache

    // invalidate queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (error, newPost, { previousPosts, mockId }) => {
    console.log("create-error", {
      error,
      newPost,
      context: { previousPosts, mockId },
    });

    // on error revert the cache
    queryClient.removeQueries(["posts", mockId]);
    queryClient.setQueryData(["posts"], previousPosts);

    // invalidate queries
    queryClient.invalidateQueries();
  };

  return useMutation({
    mutationFn: createPost,
    onMutate: handleMutate,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useCreatePost;
