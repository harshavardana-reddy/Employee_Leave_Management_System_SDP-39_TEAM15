import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import EmpNavBar from './EmpNavBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ApplyLeave() {
  const [employeeID,setEmployeeID] = useState('')
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveMessage, setLeaveMessage] = useState('');
  const data = {
    EmployeeID:employeeID,
    LeaveType:leaveType,
    LeaveStart:startDate,
    LeaveEnd:endDate,
    LeaveMessage:leaveMessage,
  }

  const handleLeaveSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:2863/employee/applyleave",data)
      console.log(response.data)
      if(response.status===200){
        toast.success("Leave Applied Succesfully!")
      }
    }
    catch(e){
      console.log(e.message)
      toast.error("Error Applying Leave!")
    }
    // Add your logic to submit leave here  
  };

  return (
    <div>
      <EmpNavBar/>
    <Container maxWidth="md" className="mt-8">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Leave Application Form</h2>
        <form onSubmit={handleLeaveSubmit}>
          <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Enter Employee ID : </label>
          <input
                type="text"
                variant="outlined"
                className="input input-bordered w-full"
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
                required
              />
            <label className="block text-gray-700 font-bold mb-2">Select Leave Type</label>
            <select
              className="input input-bordered w-full"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Compensated Casual Leave">Compensated Casual Leave</option>
              <option value="Half-Paid Leave">Half-Paid Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Leave Dates</label>
            <div className="flex">
              <TextField
                type="date"
                variant="outlined"
                className="input input-bordered w-full"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
              <span className="mx-2">to</span>
              <TextField
                type="date"
                variant="outlined"
                className="w-full ml-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Leave Message</label>
            <textarea
              className="input input-bordered w-full"
              rows={4}
              value={leaveMessage}
              onChange={(e) => setLeaveMessage(e.target.value)}
              required
            />
          </div>
          <div align="center" >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="btn btn-primary"
          >
            Apply Leave
          </Button>
          </div>
        </form>
      </div>
    </Container>
    <ToastContainer/>
    </div>
  );
}
