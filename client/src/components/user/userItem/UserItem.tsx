import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableHead,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

  //const userEmail = user.email;
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

        <TableCell component="th" scope="row">
          {user.firstName}
          <IconButton onClick={adminHandler}>
            <SupervisorAccountIcon
              sx={{
                fontSize: "20px",
                color: bannedValue ? "black" : adminValue ? "green" : "black",
              }}
            />
          </IconButton>
          <IconButton onClick={adminandBannedHandler}>
            <BlockIcon
              sx={{ fontSize: "18px", color: bannedValue ? "red" : "green" }}
            />
          </IconButton>
        </TableCell>
        <TableCell align="right">{user.role}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontSize: "16px", fontWeight: "bold" }}
              >
                User Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Github</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Location
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Phone number
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={user.firstName}>
                    <TableCell component="th" scope="row">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.gitHub}</TableCell>
                    <TableCell align="right">{user.location}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
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
