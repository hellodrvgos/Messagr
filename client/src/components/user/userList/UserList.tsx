
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../redux/store";
import fetchUsersData from "../../../redux/thunk/userThunk";

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import BlockIcon from '@mui/icons-material/Block';

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


export default function UserListTable() {

  const userId = localStorage.getItem("id") || "{}";

    //console.log(userList,"uerLisrt")
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(fetchUsersData())
    }, [dispatch, userId])

    const userList = useSelector((state: RootState)=> state.users.userList);


    useEffect(() => {
       dispatch(getUserInformation());
    }, [dispatch, userId]);

    const userInfoDetails = useSelector((state: RootState) => state.userinformation.userInfo);

    if (userInfoDetails.isAdmin === true) {
        return (
          <TableContainer component={Paper} sx={{width: "80%", mx: "auto", mt: 10}}>
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
              <TableBody>
                {userList.map((user) => (
                  <StyledTableRow key={user.email}>
                    <StyledTableCell component="th" scope="row">
                      {user.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="right">{user.role}</StyledTableCell>
                    <StyledTableCell align="right">{user.email}</StyledTableCell>
                    <StyledTableCell align="right"><SupervisorAccountIcon/></StyledTableCell>
                    <StyledTableCell align="right"><BlockIcon/></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
      return (
        <div>
          Not authorized...
        </div>
      )
    // }

  // return (<div>
  //   <p>Not Authorized</p>
  // </div>
  // );
}
