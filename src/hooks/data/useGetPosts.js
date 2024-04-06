import { useQuery } from "@tanstack/react-query";
import api from "../../api";

const getPosts = () => api.get("/posts").then((res) => res.data);

const useGetPosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

export default useGetPosts;
