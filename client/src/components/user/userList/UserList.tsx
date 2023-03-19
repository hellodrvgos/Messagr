import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";
import { useEffect, useState } from "react";

import "../../../App.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";
import { useSelector } from "react-redux";
import { getUserInformation } from "../../../redux/thunk/userInformation";
import { userActions } from "../../../redux/slice/userSlice";
import UserItem from "../userItem/UserItem";

export default function UserList() {
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const userId = localStorage.getItem("id") || "{}";
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch, userId]);
  const userList = useSelector((state: RootState) => state.users.userList);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch, userId]);

  const sortAscendingHandler = () => {
    dispatch(userActions.sortAscending());
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const sortDescendingHandler = () => {
    dispatch(userActions.sortDescending());
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const userInfo = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );
  const filteredUserList = userList.filter((user) => user._id !== userInfo._id);
  return (
    <div className="userlist-page">
      <Box sx={{ width: "600px", pt: 20, ml: 15 }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  onClick={
                    orderDirection === "asc"
                      ? sortAscendingHandler
                      : sortDescendingHandler
                  }
                  sx={{ fontWeight: "bold" }}
                >
                  Name
                  <TableSortLabel
                    active={true}
                    direction={orderDirection}
                    sx={{ ml: 1 }}
                  ></TableSortLabel>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUserList.map((user, index) => (
                <UserItem key={index} user={user} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
