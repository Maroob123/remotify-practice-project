import { Outlet } from "react-router-dom";
import { Header } from "../components";
import { CssBaseline, Toolbar } from "@mui/material";

function RootLayout() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
