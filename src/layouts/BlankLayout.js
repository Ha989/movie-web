import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <HeaderStyle></HeaderStyle>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;