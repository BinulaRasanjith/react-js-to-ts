import { useQuery } from "@tanstack/react-query";

import api from "../../api";

const getPost = (id) =>
  api.get(`/posts/${id}`).then((res) => {
    return res.data;
  });

const useGetPost = (id) =>
  useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });

export default useGetPost;
