import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";

const deletePost = (deletedPostId) =>
  api.delete(`/posts/${deletedPostId}`).then((res) => res.data);

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const handleMutate = (deletedPostId) => {
    const previousPosts = queryClient.getQueryData(["posts"]);
    const deletedPost = queryClient.getQueryData(["posts", deletedPostId]);

    // optimistically remove the deleted post from the cache
    queryClient.setQueryData(["posts"], (oldPosts) =>
      oldPosts.filter((post) => post.id !== deletedPostId)
    );

    // remove the specific post from the cache
    queryClient.removeQueries({
      queryKey: ["posts", deletedPostId],
      exact: true,
    });

    // return the previous post and the deleted post to the context
    return { previousPosts, deletedPost };
  };

  const handleSuccess = (data, deletedPostId, context) => {
    console.log("delete-success", {
      data,
      deletedPostId,
      context,
    });

    // on success invalidate the queries
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  };

  const handleError = (error, deletedPostId, context) => {
    console.log("delete-error", {
      error,
      deletedPostId,
      context,
    });

    const { previousPosts, deletedPost } = context;

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
