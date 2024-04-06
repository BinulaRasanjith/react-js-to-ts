import { useQuery } from "@tanstack/react-query";

import api from "../../api";

const getPost = (id) =>
  api.get(`/posts/${id}`).then((res) => {
    console.log(res);
    return res.data;
  });

const useGetPost = (id) =>
  useQuery({
    queryKey: ["posts", 1],
    queryFn: (d) => getPost(id),
  });

export default useGetPost;
