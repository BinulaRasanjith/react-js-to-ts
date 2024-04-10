import { useQuery } from "@tanstack/react-query";

import api from "../../api";

const getPost = (id: string | undefined) =>
  api.get(`/posts/${id}`).then((res) => {
    return res.data as Post;
  });

const useGetPost = (id: string | undefined) =>
  useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });

export default useGetPost;
