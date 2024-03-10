import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
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

export default function ViewLeaves() {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:2863/admin/leavesapplied');
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleApprove = async (leaveID) => {
    try {
      await axios.put(`http://localhost:2863/admin/approve/${leaveID}`);
      toast.success('Leave approved successfully');
      fetchLeaves();
    } catch (error) {
      console.error('Error approving leave:', error);
      toast.error('Failed to approve leave');
    }
  };

  const handleReject = async (leaveID) => {
    try {
      await axios.put(`http://localhost:2863/admin/reject/${leaveID}`);
      toast.success('Leave rejected successfully');
      fetchLeaves();
    } catch (error) {
      console.error('Error rejecting leave:', error);
      toast.error('Failed to reject leave');
    }
  };
  const handleDelete = async (leaveID) => {
    try {
      await axios.delete(`http://localhost:2863/admin/deleteleaveByid/${leaveID}`);
      toast.success('Leave deleted successfully');
      fetchLeaves();
    } catch (error) {
      console.error('Error deleting leave:', error);
      toast.error('Failed to delete leave');
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <h1 className="text-center text-3xl font-bold mb-8 animate-bounce" style={{ fontSize: '20pt' }}>View Leaves</h1>
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
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={9}>No records found</StyledTableCell>
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
                  <StyledTableCell align="center">
                    <Button variant='contained' style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleApprove(leave.LeaveID)}>Approve</Button>&nbsp;
                    <Button variant='contained' style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleReject(leave.LeaveID)}>Reject</Button>&nbsp;
                    <Button variant='contained' style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(leave.LeaveID)}>Delete</Button>
                  </StyledTableCell>
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
