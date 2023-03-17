import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useEffect, useState} from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import BlockIcon from '@mui/icons-material/Block';
import { IconButton } from '@mui/material';
import { User } from '../../../types/types';

import { getUserInformation } from "../../../redux/thunk/userInformation";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type Prop ={
    user: User;
}

export default function UserItem({user}: Prop) {

    const userId = localStorage.getItem("id") || "{}";

    const [adminValue, setAdminValue] = useState(user.isAdmin)
    const [bannedValue, setBannnedValue] = useState(user.isBanned)

    const userEmail = user.email;
    const token = localStorage.getItem("token");

    console.log(user, "user useritem")

    const id = user._id;

    function adminHandler(){
      const url = `http://localhost:8002/users/adminstatus/${userId}`;
      axios.put(url, {id: id, isAdmin: !adminValue}, {headers: {Authorization: `Bearer ${token}`}});
      setAdminValue(!adminValue);
  }
    function bannedHandler(){
        const url = `http://localhost:8002/users/banstatus/${userId}`;
        axios.put(url, {id: id, isBanned: !bannedValue}, {headers: {Authorization: `Bearer ${token}`}});
        setBannnedValue(!bannedValue)
    }
  return (
        <TableBody>
            <StyledTableRow key={user.email}>
              <StyledTableCell component="th" scope="row">
                {user.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{user.role}</StyledTableCell>
              <StyledTableCell align="right">{user.email}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton onClick={adminHandler}>
                  <SupervisorAccountIcon sx={{color: adminValue ? "green" : "black"}}/>
                </IconButton>
                </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton onClick={bannedHandler}>
                  <BlockIcon sx={{color: bannedValue? "red" : "green"}}/>
                </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
  );
}
