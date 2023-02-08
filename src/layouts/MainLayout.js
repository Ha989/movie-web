import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Footer from "./Footer";
import SideBar from "./Sidebar";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <SideBar />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <Footer />
    </Stack>
  );
}

export default MainLayout;