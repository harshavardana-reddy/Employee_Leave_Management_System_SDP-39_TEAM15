import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import EmpNavBar from './EmpNavBar';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableContainerWithMargin = styled(TableContainer)({
  margin: '20px',
});

const StyledTable = styled(Table)({
  backgroundColor: 'white',
  width: '96.9%',
  border: '4px solid black',
});

export default function LeaveHistory1() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:2863/admin/leavesapplied');
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <EmpNavBar/>
      <h1 className="text-center text-3xl font-bold mb-8 " style={{ fontSize: '20pt' }}>View Leave History </h1>
      <TableContainerWithMargin>
        <StyledTable aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Employee ID</StyledTableCell>
              <StyledTableCell align="center">Leave ID</StyledTableCell>
              <StyledTableCell align="center">Leave Type</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>Leave Message</StyledTableCell>
              <StyledTableCell align="center">Leave Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>No Leaves found</StyledTableCell>
              </StyledTableRow>
            ) : (
              leaves.map((leave) => (
                <StyledTableRow key={leave.LeaveID}>
                  <StyledTableCell align="center">{leave.EmployeeID}</StyledTableCell>
                  <StyledTableCell align="center">{leave.LeaveID}</StyledTableCell>
                  <StyledTableCell align="center">{leave.LeaveType}</StyledTableCell>
                  <StyledTableCell align="center">{leave.LeaveStart}</StyledTableCell>
                  <StyledTableCell align="center">{leave.LeaveEnd}</StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>{leave.LeaveMessage}</StyledTableCell>
                  <StyledTableCell align="center">{leave.LeaveStatus}</StyledTableCell>
                
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainerWithMargin>
      <ToastContainer />
    </div>
  );
}
