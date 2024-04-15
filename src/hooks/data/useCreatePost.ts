import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";

interface TContext {
  previousPosts: Post[];
  mockId: string;
}

const createPost = (newPost: Post) =>
  api.post("/posts", newPost).then((res) => res.data as Post);

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (newPost: Post) => {
    // get the previous posts
    const previousPosts = queryClient.getQueryData(["posts"]);

    const mockId = String(Date.now());

    // add the new post to the cache
    queryClient.setQueryData(["posts"], (previousPosts: Post[]) => [
      ...previousPosts,
      { ...newPost, id: mockId },
    ]);

    // return the context
    return { previousPosts, mockId } as TContext;
  };

  const handleSuccess = (data: Post, newPost: Post, context: TContext) => {
    console.log("create-success", {
      data,
      newPost,
      context,
    });

    const { mockId } = context;

    // remove cached post with mock id
    queryClient.removeQueries({ queryKey: ["posts", mockId], exact: true });

    //  add the new post to the cache
    queryClient.setQueryData(["posts", data.id], data);

    // invalidate queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (error: any, newPost: Post, context?: TContext) => {
    console.log("create-error", {
      error,
      newPost,
      context,
    });
    if (context) {
      const { previousPosts, mockId } = context;

      // on error revert the cache
      queryClient.removeQueries({ queryKey: ["posts", mockId], exact: true });
      queryClient.setQueryData(["posts"], previousPosts);

      // invalidate queries
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } else {
      //  handle context undefined
    }
  };

  return useMutation({
    mutationFn: createPost,
    onMutate: handleMutate,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useCreatePost;
