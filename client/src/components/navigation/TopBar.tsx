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
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { userInfoActions } from "../../redux/slice/userInformation";
import "../../App.css"

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
    <Box >
      <AppBar position="static" sx={{color: "white", bgcolor: "#fff0", boxShadow: "none", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Link href="/" sx={{cursor: "pointer", textDecoration: "none", color: "white"}}><Typography variant="h4" className="logo" sx={{pl: 2, lineHeight: 1, letterSpacing: 4}}>Messagr...</Typography></Link>
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
                {/* <MenuIcon /> */}
                <WidgetsIcon fontSize="large" />
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
                      {/* <Typography>Profile</Typography> */}
                      <PersonIcon fontSize="large"/>
                    </Link>
                  </MenuItem>
                  {/* <MenuItem>
                    <Link
                      href="/update"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      <Typography>Update</Typography>
                    </Link>
                  </MenuItem> */}
                  <MenuItem>
                    <Link
                      href="/chat"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      {/* <Typography>Chat</Typography> */}
                      <ChatIcon fontSize="large"/>
                    </Link>
                  </MenuItem>
                  {userInfo.isAdmin ? (
                    <MenuItem>
                      <Link
                        href="/userlist"
                        variant="h4"
                        sx={{ textDecoration: "none" }}
                      >
                        {/* <Typography>UserList</Typography> */}
                        <GroupIcon fontSize="large"/>
                      </Link>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                    <Link
                      href="/"
                      variant="body1"
                      sx={{ textDecoration: "none" }}
                    >
                      {/* <Typography
                        onClick={() => {
                          logOutHandler();
                        }}
                      >
                        Logout
                      </Typography> */}
                      <LogoutIcon fontSize="large" onClick={() => {
                          logOutHandler();
                        }}/>
                    </Link>
                  </MenuItem>
                </Menu>
              ) : null
              // (
              //   <Menu
              //     id="menu-appbar"
              //     anchorEl={anchorEl}
              //     anchorOrigin={{
              //       vertical: "top",
              //       horizontal: "right",
              //     }}
              //     keepMounted
              //     transformOrigin={{
              //       vertical: "top",
              //       horizontal: "right",
              //     }}
              //     open={Boolean(anchorEl)}
              //     onClose={handleClose}
              //   >
              //     <MenuItem>
              //       <Link
              //         href="/login"
              //         variant="body1"
              //         sx={{ textDecoration: "none" }}
              //       >
              //         <Typography>Login</Typography>
              //       </Link>
              //     </MenuItem>
              //     <MenuItem>
              //       <Link
              //         href="/register"
              //         variant="body1"
              //         sx={{ textDecoration: "none" }}
              //       >
              //         <Typography>Register</Typography>
              //       </Link>
              //     </MenuItem>
              //   </Menu>
              // )
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
