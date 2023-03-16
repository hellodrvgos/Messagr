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

    const [adminValue, setAdminValue] = useState(user.isAdmin)
    console.log(adminValue, "admin value");
    const userEmail = user.email;
    const token = localStorage.getItem("token");
    //console.log(dbUserId, "userId")
    //const userId = localStorage.getItem("id") || "{}";
    function adminHandler(){
        setAdminValue(!adminValue)
        const url = `http://localhost:8002/users/update/${userEmail}`;
        axios.put(url, {isAdmin: adminValue}, {headers: {Authorization: `Bearer ${token}`}});
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
                  <SupervisorAccountIcon sx={{color: adminValue? "green" : "black"}}/>
                </IconButton>
                </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                  <BlockIcon/>
                </IconButton>
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
  );
}
