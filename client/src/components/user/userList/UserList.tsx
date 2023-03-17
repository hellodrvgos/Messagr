
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";


import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import BlockIcon from "@mui/icons-material/Block";

import { getUserInformation } from "../../../redux/thunk/userInformation";
import UserItem from "../userItem/UserItem";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function UserListTable() {
  const userId = localStorage.getItem("id") || "{}";

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch, userId]);
  const userList = useSelector((state: RootState) => state.users.userList);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const userInfo = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );

  const filteredUserList = userList.filter((user)=> user.email !== userInfo.email);

  console.log(filteredUserList, "filteredUserList")

  // const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

  if (userInfo.isAdmin === true) {
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "80%", mx: "auto", mt: 10 }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">E-mail</StyledTableCell>
              <StyledTableCell align="right">Admin</StyledTableCell>
              <StyledTableCell align="right">Banned</StyledTableCell>
            </TableRow>
          </TableHead>
          {filteredUserList.map((user, index) => {
            return <UserItem key={index} user={user} />;
          })}
        </Table>
      </TableContainer>
    );
  }
  return <div>Not authorized...</div>;

}
