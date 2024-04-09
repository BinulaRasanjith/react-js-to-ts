import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Posts from "../components/Posts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="left-side">
          <Posts />
        </div>
        <div className="right-side">
          <Outlet />
        </div>
      </main>
      <ReactQueryDevtools />
    </>
  );
};

export default Layout;
