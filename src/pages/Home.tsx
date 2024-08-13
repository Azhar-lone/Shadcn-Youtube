import React from "react";
// import Header from "./Header";
import Sidebar from "@/components/myUi/Sidebar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Home;
