import React from "react";
// import Header from "./Header";
import Sidebar from "@/components/myUi/Sidebar";
import Nav from "@/components/myUi/Nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/redux/theme-provider";

const Home: React.FC = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav />
        <Sidebar />
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default Home;
