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

import { userActions } from "../../../redux/slice/userSlice";
import { TableSortLabel } from "@mui/material";

import { User } from "../../../types/types";

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
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
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

  const sortAscendingHandler = () => {
    dispatch(userActions.sortAscending());
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    // setOrderDirection("asc");
  };

  const sortDescendingHandler = () => {
    dispatch(userActions.sortDescending());
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    // setOrderDirection("desc");
  };

  const filteredUserList = userList.filter(
    (user) => user.email !== userInfo.email
  );

  // const filteredUserList = userList.filter((user)=> user._id !== userInfo._id);

  //console.log(filteredUserList, "filteredUserList")

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
              <StyledTableCell
                onClick={
                  orderDirection === "asc"
                    ? sortAscendingHandler
                    : sortDescendingHandler
                }
              >
                Name
                <TableSortLabel
                  active={true}
                  direction={orderDirection}
                  sx={{ background: "#fff", ml: 1, color: "#000" }}
                ></TableSortLabel>
              </StyledTableCell>
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
