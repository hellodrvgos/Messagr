import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";
import IconButton from "@mui/material/IconButton";

export default function UserList() {
  const userList = useSelector((state: RootState) => state.users.userList);
  console.log(userList, "user list from userList component");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);
  return (
    <div>
      {userList.map((user) => {
        return (
          <div>
            <Typography>{user.firstName}</Typography>
            <Typography>{user.email}</Typography>
            <IconButton>
              <BlockIcon sx={{ color: user.isBanned ? "red" : "green" }} />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
}
