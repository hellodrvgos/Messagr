import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableHead,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
} from "@mui/material";

import { User } from "../../../types/types";
import { useDispatch } from "react-redux";
import fetchUsersData from "../../../redux/thunk/userThunk";
import { AppDispatch } from "../../../redux/store";
import { getUserInformation } from "../../../redux/thunk/userInformation";

type Prop = {
  user: User;
};

export default function UserItem({ user }: Prop) {
  const [open, setOpen] = React.useState(false);
  const userId = localStorage.getItem("id") || "{}";
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const [adminValue, setAdminValue] = useState(user.isAdmin);
  const [bannedValue, setBannnedValue] = useState(user.isBanned);

  const token = localStorage.getItem("token");
  const id = user._id;

  function adminHandler() {
    if (bannedValue) {
      setAdminValue(false);
      const url = `http://localhost:8002/users/adminstatus/${userId}`;
      axios.put(
        url,
        { id: id, isAdmin: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return;
    }
    const url = `http://localhost:8002/users/adminstatus/${userId}`;
    axios.put(
      url,
      { id: id, isAdmin: !adminValue },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setAdminValue(!adminValue);
  }
  function bannedHandler() {
    const url = `http://localhost:8002/users/banstatus/${userId}`;
    axios.put(
      url,
      { id: id, isBanned: !bannedValue },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setBannnedValue(!bannedValue);
  }

  function adminandBannedHandler() {
    bannedHandler();
    if (!bannedValue) {
      const url = `http://localhost:8002/users/adminstatus/${userId}`;
      axios.put(
        url,
        { id: id, isAdmin: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdminValue(false);
    }
  }
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          sx={{
            fontSize: "24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 2,
          }}
        >
          <Avatar
            alt={user.firstName}
            src={user.avatar}
            sx={{ width: 40, height: 40 }}
          />
          <Typography sx={{ fontSize: "28px" }}>{user.firstName}</Typography>
          <Box sx={{ flexGrow: 4, textAlign: "right" }}>
            <IconButton onClick={adminHandler}>
              <SupervisorAccountIcon
                sx={{
                  fontSize: "32px",
                  color: bannedValue ? "gray" : adminValue ? "#4EEC20" : "gray",
                }}
              />
            </IconButton>
            <IconButton onClick={adminandBannedHandler}>
              <BlockIcon
                sx={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: bannedValue ? "red" : "#4EEC20",
                }}
              />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            backgroundColor: "aliceblue",
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="userinfo">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "18px" }}>Email</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>Github</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>Location</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>Phone</TableCell>
                    <TableCell sx={{ fontSize: "18px" }}>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={user.firstName}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: "18px", borderBottom: 0 }}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", borderBottom: 0 }}>
                      {user.gitHub}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", borderBottom: 0 }}>
                      {user.location}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", borderBottom: 0 }}>
                      {user.phone}
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", borderBottom: 0 }}>
                      {user.role}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
