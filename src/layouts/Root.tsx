import React from "react";
import Sidebar from "@/components/myUi/Sidebar";
import Nav from "@/components/myUi/Nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/redux/theme-provider";

const Rootlayout: React.FC = () => {
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

export default Rootlayout;
