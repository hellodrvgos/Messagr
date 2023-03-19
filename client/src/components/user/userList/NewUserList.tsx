import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import "../../../App.css"



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

function UserInfo(props: { user: User }) {

  const { user } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> 
          {user.firstName}
        </TableCell>
        <TableCell align="right">{user.role}</TableCell>

      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                User Info
              </Typography>

              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>GitHub</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {user.email}
                      </TableCell>
                      <TableCell>{user.gitHub}</TableCell>
                      <TableCell align="right">{user.location}</TableCell>
                      <TableCell align="right">
                        {user.phone}
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

export default function CollapsibleTable() {

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

    const filteredUserList = userList.filter((user)=> user._id !== userInfo._id);

  return (
    <div className='userlist-page'>
    <Box sx={{width: "600px", pt: 20, ml: 15}}>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">

        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredUserList.map((user) => (
            <UserInfo key={user._id} user={user} />
          ))}
        </TableBody>

      </Table>
    </TableContainer>

    </Box>

    </div>
  );
}