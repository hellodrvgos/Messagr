import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { userInfoActions } from "../../redux/slice/userInformation";

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userInfo = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );
  const loginInfo: boolean = JSON.parse(localStorage.getItem("loginInfo")!);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(userInfoActions.getLogInInfo(false));
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1, zIndex: "999" }}>
      <AppBar position="static">
        <Toolbar>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {loginInfo ? (
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
                  <MenuItem>
                    <Link
                      href="/profile"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Profile</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/update"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Update</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/chat"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Chat</Typography>
                    </Link>
                  </MenuItem>
                  {userInfo.isAdmin ? (
                    <MenuItem>
                      <Link
                        href="/user-list"
                        variant="body1"
                        sx={{ textDecoration: "none" }}
                      >
                        <Typography>UserList</Typography>
                      </Link>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                    <Link
                      href="/"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography
                        onClick={() => {
                          logOutHandler();
                        }}
                      >
                        Logout
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              ) : (
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
                  <MenuItem>
                    <Link
                      href="/login"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Login</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/register"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Register</Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
