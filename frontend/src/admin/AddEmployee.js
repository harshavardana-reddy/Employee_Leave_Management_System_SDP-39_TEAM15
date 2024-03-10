import React, { useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    EmployeeName: '',
    EmployeeDOB: '',
    EmployeeGender:'',
    EmployeeAge: '',
    EmployeeMailID: '',
    EmployeeContact: '',
    EmployeeDepartment: '',
    EmployeeQualification: '',
    EmployeeSalary: '',
    EmployeeLocation: '', // Changed from EmployeeLocation to match the backend
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Additional logic to calculate age based on date of birth
    if (name === 'EmployeeDOB') {
      // Set Date of Birth directly
      setEmployeeData(prevState => ({
        ...prevState,
        EmployeeDOB: value
      }));
      
      // Calculate age from date of birth
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Update EmployeeAge state if it falls within the desired range
      if (age >= 21 && age <= 50) {
        setEmployeeData(prevState => ({
          ...prevState,
          EmployeeAge: age.toString() // Convert age to string
        }));
      }
    } else {
      // For other fields, update state as usual
      setEmployeeData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2863/admin/addEmployee', employeeData);
      //console.log(response.data);
      if (response.status === 200) {
        toast.success("Employee added successfully");
        setEmployeeData({
          EmployeeName: '',
          EmployeeDOB: '',
          EmployeeGender:'',
          EmployeeAge: '',
          EmployeeMailID: '',
          EmployeeContact: '',
          EmployeeDepartment: '',
          EmployeeQualification: '',
          EmployeeSalary: '',
          EmployeeLocation: '', 
        });
      } else {
        toast.error("Error adding employee. Please try again later.");
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error("Error adding employee. Please try again later.");
    }
  };

  const handleFileChange = () => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        // Ensure this field matches your backend expectation
        // Use axios.post to upload the file
        axios.post('http://localhost:2863/admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // Handle successful response
            console.log(response.data);
            toast.success("Employees added successfully");
        }).catch(error => {
            // Handle error
            console.error('Error uploading file:', error);
            toast.error("Error uploading file. Please try again later.");
        });
    } else {
        console.error('No file selected');
        toast.error("Please select a file.");
    }
};


  return (
    <div>
      <AdminNavBar/>
      <div className="p-4 bg-gray-200 shadow-lg rounded-md" id='wrapper'>
        <h2 className="text-2xl text-center font-bold mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputLabel id="name-label">Employee Name</InputLabel>
            <TextField
              label="Employee Name"
              name="EmployeeName"
              value={employeeData.EmployeeName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <InputLabel id="dob-label">Date of Birth</InputLabel>
            <TextField
              label=""
              name="EmployeeDOB"
              value={employeeData.EmployeeDOB}
              onChange={handleChange}
              variant="outlined"
              type="date"
              fullWidth
              required
            />
            <InputLabel id="gender-label">Employee Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="EmployeeGender"
              value={employeeData.EmployeeGender}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="">Select Genders</MenuItem>
              <MenuItem value="Male">MALE</MenuItem>
              <MenuItem value="Female">FEMALE</MenuItem>
              <MenuItem value="Others">OTHERS</MenuItem>
            </Select>
            <InputLabel id="age-label">Age</InputLabel>
            <TextField
              label="Age"
              name="EmployeeAge"
              value={employeeData.EmployeeAge}
              onChange={handleChange}
              variant="outlined"
              type="number"
              fullWidth
              disabled
              inputProps={{ min: 18, max: 50 }}
            />
            
            <InputLabel id="email-label">Employee Email</InputLabel>
            <TextField
              label="Email ID"
              name="EmployeeMailID"
              value={employeeData.EmployeeMailID}
              onChange={handleChange}
              variant="outlined"
              type="email"
              fullWidth
              required
            />
            <InputLabel id="contact-label">Employee Contact</InputLabel>
            <TextField
              label="Contact"
              name="EmployeeContact"
              value={employeeData.EmployeeContact}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              inputProps={{ pattern: "[6789][0-9]{9}", title: "Please enter a valid 10-digit Indian mobile number" }}
              required
            />
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              name="EmployeeDepartment"
              value={employeeData.EmployeeDepartment}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="">Select Department</MenuItem>
              <MenuItem value="CSE(Honors)">CSE(Honors)</MenuItem>
              <MenuItem value="CSE(Regulars)">CSE(Regulars)</MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="BT">BT</MenuItem>
              <MenuItem value="MECH">MECH</MenuItem>
            </Select>
            <InputLabel id="qualification-label">Qualification</InputLabel>
            <Select
              labelId="qualification-label"
              name="EmployeeQualification"
              value={employeeData.EmployeeQualification}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="">Select Qualification</MenuItem>
              <MenuItem value="Ph.D">Ph.D</MenuItem>
              <MenuItem value="M.Tech">M.Tech</MenuItem>
              <MenuItem value="PG">PG</MenuItem>
              <MenuItem value="B.Tech">B.Tech</MenuItem>
            </Select>
            <InputLabel id="salary-label">Employee Salary</InputLabel>
            <TextField
              label="Salary"
              name="EmployeeSalary"
              value={employeeData.EmployeeSalary}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="number"
              required
            />
            <InputLabel id="location-label">Employee Location</InputLabel>
            <TextField
              label="Location"
              name="EmployeeLocation"
              value={employeeData.EmployeeLocation}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              type="text"
              required
            />
            <div align="center" >
            <Button type="submit" variant="contained" color="primary">Add Employee</Button>
            </div>
          </div>
        </form>
        <div className="mt-4" align="center">
            <input type="file" name="file" accept=".csv" />
            <Button variant="contained" color="secondary" onClick={handleFileChange}>Import as CSV</Button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
