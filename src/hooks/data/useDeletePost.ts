import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";

interface Context {
  previousPosts: Post[];
  deletedPost: Post;
}

const deletePost = (deletedPostId: string) =>
  api.delete(`/posts/${deletedPostId}`).then((res) => res.data as Post);

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (deletedPostId: string) => {
    const previousPosts = queryClient.getQueryData(["posts"]) as Post[];
    const deletedPost = queryClient.getQueryData([
      "posts",
      deletedPostId,
    ]) as Post;

    // optimistically remove the deleted post from the cache
    queryClient.setQueryData(["posts"], (oldPosts: Post[]) =>
      oldPosts.filter((post) => post.id !== deletedPostId)
    );

    // remove the specific post from the cache
    queryClient.removeQueries({
      queryKey: ["posts", deletedPostId],
      exact: true,
    });

    // return the previous post and the deleted post to the context
    return { previousPosts, deletedPost } as Context;
  };

  const handleSuccess = (
    data: Post,
    deletedPostId: string,
    { previousPosts, deletedPost }: Context
  ) => {
    console.log("delete-success", {
      data,
      deletedPostId,
      context: { previousPosts, deletedPost },
    });

    // on success remove deleted post query & invalidate the queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (
    error: any,
    deletedPostId: string,
    { previousPosts, deletedPost }: Context = {} as Context
  ) => {
    console.log("delete-error", {
      error,
      deletedPostId,
      context: { previousPosts, deletedPost },
    });

    // on error revert the cache & invalidate the queries
    queryClient.setQueryData(["posts"], previousPosts);
    queryClient.setQueryData(["posts", deletedPostId], deletedPost);

    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  return useMutation({
    mutationFn: deletePost,
    onMutate: handleMutate,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};

export default useDeletePost;
