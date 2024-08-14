import React from "react";
import Sidebar from "@/components/myUi/Sidebar";
import Nav from "@/components/myUi/Nav";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/redux/theme-provider";
import Container from "@/components/myUi/Container";


const Rootlayout: React.FC = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav />
        <Sidebar />
        <Container>
        <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Rootlayout;
