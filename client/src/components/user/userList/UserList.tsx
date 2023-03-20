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
  const userList = useSelector((state: RootState) => state.users.userList);
  const userInfo = useSelector(
    (state: RootState) => state.userinformation.userInfo
  );
  const filteredUserList = userList.filter((user) => user._id !== userInfo._id);

  const userId = localStorage.getItem("id") || "{}";
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch, userId]);

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

  return (
    <div className="userlist-page">
<<<<<<< HEAD
      <Box sx={{ width: "700px", pt: 8, ml: 12 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 540, borderRadius: "20px", boxShadow: "0px 0px 30px #5521b595" }}>
=======
      <Box sx={{ width: "700px", pt: 11, ml: 12 }}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 540,
            borderRadius: "20px",
            boxShadow: "0px 0px 30px #5521b595",
          }}
        >
>>>>>>> b309c98d3e295987408ad4423061d48e99e5c54b
          <Table stickyHeader aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  onClick={
                    orderDirection === "asc"
                      ? sortAscendingHandler
                      : sortDescendingHandler
                  }
                  sx={{ fontWeight: 500, fontSize: "32px", py: 3 }}
                >
                  Users
                  <TableSortLabel
                    active={true}
                    direction={orderDirection}
                    sx={{ ml: 1 }}
                  ></TableSortLabel>
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
