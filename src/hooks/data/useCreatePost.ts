import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";

interface Context {
  previousPosts: Post[];
  mockId: string;
}

const createPost = (newPost: Post) =>
  api.post("/posts", newPost).then((res) => res.data as Post);

const useCreatePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (newPost: Post) => {
    // get the previous posts
    const previousPosts: Post[] = queryClient.getQueryData(["posts"]) ?? [];

    const mockId = String(Date.now());

    // add the new post to the cache
    queryClient.setQueryData(["posts"], (previousPosts: Post[]) => [
      ...previousPosts,
      { ...newPost, id: mockId },
    ]);

    // return the context
    return { previousPosts, mockId } as Context;
  };

  const handleSuccess = (
    data: Post,
    newPost: Post,
    { previousPosts, mockId }: { previousPosts: Post[]; mockId: string }
  ) => {
    console.log("create-success", {
      data,
      newPost,
      context: { previousPosts, mockId },
    });

    // remove cached post with mock id
    queryClient.removeQueries({ queryKey: ["posts", mockId], exact: true });

    // TODO: add the new post to the cache

    // invalidate queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (
    error: any,
    newPost: Post,
    context: Context = {} as Context
  ) => {
    console.log("create-error", {
      error,
      newPost,
      context,
    });

    const { previousPosts, mockId } = context;

    // on error revert the cache
    queryClient.removeQueries({ queryKey: ["posts", mockId], exact: true });
    queryClient.setQueryData(["posts"], previousPosts);

    // invalidate queries
    queryClient.invalidateQueries({});
  };

  return useMutation({
    mutationFn: createPost,
    onMutate: handleMutate,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useCreatePost;
