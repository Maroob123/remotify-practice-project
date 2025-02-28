import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutUser } from "../redux/authActions";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector((state) => state.auth.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value === "logout") {
      dispatch(signoutUser());
    } else {
      navigate("/favorites");
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        color="transparent"
        sx={{
          bgcolor: "#fff",
          border: ".15px solid #ccc",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Link sx={{ flexGrow: 1 }} href="/">
            <img src="/wordmark_H_orange.svg" width={220} height={55} alt="" />
          </Link>
          {!auth?.uid ? (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button variant="contained" href="signup">
                Sign up
              </Button>
              <Button variant="text" href="/login">
                Login
              </Button>
            </Box>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose("favorites")}>
                  Favorites
                </MenuItem>
                <MenuItem onClick={() => handleClose("logout")}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
