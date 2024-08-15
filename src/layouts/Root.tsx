import React from "react";
import Sidebar from "@/components/myUi/Sidebar";
import Header from "@/components/myUi/Header";
import { Bottombar } from "@/components/myUi/Header";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/redux/theme-provider";
import Container from "@/components/myUi/Container";

const Rootlayout: React.FC = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Sidebar />
        <Container>
          <Outlet />
        </Container>
        <Bottombar />
      </ThemeProvider>
    </>
  );
};

export default Rootlayout;
