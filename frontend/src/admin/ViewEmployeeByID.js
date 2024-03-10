import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewEmployeeByID() {
  const [employeeData, setEmployeeData] = useState(null);
  const { id } = useParams();

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:2863/employee/employeeprofile/${id}`);
      setEmployeeData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [id]);

  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Employee Profile</h1>
        {employeeData ? (
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Employee ID:</h2>
                <p>{employeeData.EmployeeID}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Name:</h2>
                <p>{employeeData.EmployeeName}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Date of Birth:</h2>
                <p>{employeeData.EmployeeDOB}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Gender:</h2>
                <p>{employeeData.EmployeeGender}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Age:</h2>
                <p>{employeeData.EmployeeAge}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Email Address:</h2>
                <p>{employeeData.EmployeeMailID}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Contact:</h2>
                <p>{employeeData.EmployeeContact}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Department:</h2>
                <p>{employeeData.EmployeeDepartment}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Qualification:</h2>
                <p>{employeeData.EmployeeQualification}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Salary:</h2>
                <p>{employeeData.EmployeeSalary}</p>
              </div>
              <div className="border p-4 rounded-md bg-white shadow-md">
                <h2 className="text-lg font-semibold mb-2">Location:</h2>
                <p>{employeeData.EmployeeLocation}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
