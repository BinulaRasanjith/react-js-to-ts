import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import EmptySlot from "./components/EmptySlot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <EmptySlot />,
      },
      {
        path: ":id",
        element: <PostDetail />,
      },
      {
        path: "update-post/:id",
        element: <PostForm action="update" />,
      },
      {
        path: "create-post",
        element: <PostForm action="create" />,
      },
    ],
  },
]);

export default router;
