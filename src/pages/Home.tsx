import React from "react";
// import Header from "./Header";
import Sidebar from "@/components/myUi/Sidebar";
import Nav from "@/components/myUi/Nav";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Home;
