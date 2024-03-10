import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
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
  margin: '20px', // Adjust the margin value according to your preference
});

const StyledTable = styled(Table)({
  backgroundColor:'white',
  width: '96.9%', // Adjust the width as needed
  border: '4px solid black', // Add border here
});

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:2863/admin/viewEmployees');
      setEmployees(response.data); // Assuming the response data is an array of employee objects
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDelete = async (employeeID) => {
    try {
      await axios.delete(`http://localhost:2863/admin/deleteEmployee/${employeeID}`);
      // Assuming you want to refresh the employee list after deletion
      fetchEmployees();
      // Optionally, you can show a success message or perform other actions
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error('Error deleting employee:', error);
      // Handle error and show error message
      toast.error("Failed to delete employee");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <AdminNavBar/>
      <br/>
      <br/>
      <h1 align="center" style={{fontSize:'20pt'}} >View Employees</h1>
      <TableContainerWithMargin  >
        <StyledTable aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Employee ID</StyledTableCell>
              <StyledTableCell align="center">Employee NAME</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Email Address</StyledTableCell>
              <StyledTableCell align="center">Contact</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell align="center" colSpan={6}>No records found</StyledTableCell>
              </StyledTableRow>
            ) : (
              employees.map((employee) => (
                <StyledTableRow key={employee.EmployeeID}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {employee.EmployeeID}
                  </StyledTableCell>
                  <StyledTableCell align="center">{employee.EmployeeName}</StyledTableCell>
                  <StyledTableCell align="center">{employee.EmployeeDepartment}</StyledTableCell>
                  <StyledTableCell align="center">{employee.EmployeeMailID}</StyledTableCell>
                  <StyledTableCell align="center">{employee.EmployeeContact}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant='contained' onClick={() => handleDelete(employee.EmployeeID)} >Delete</Button>&nbsp;&nbsp;
                    <Link to={`viewEmployee/${employee.EmployeeID}`}>
                      <Button variant='contained'>View</Button>
                    </Link>&nbsp;&nbsp;
                    <Link to={`UpdateEmployee/${employee.EmployeeID}`}>
                      <Button variant='contained'>Update</Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainerWithMargin>
      <ToastContainer/>
    </div>
  );
}
