//import logo from './logo.svg';
import './App.css';

import AddTask from "./admin/AddTask";
import About from "./components/About";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";
import Login from "./components/Login";
import MainHome from "./components/MainHome";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ApplyLeave from "./employee/ApplyLeave";
import AdminHome from './admin/AdminHome';
import AddEmployee from "./admin/AddEmployee";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; 
import ViewEmployees from './admin/ViewEmployees';
import EmployeeHome from './employee/EmployeeHome';
import EmployeeProfile from './employee/EmployeeProfile';
import ViewEmployeeByID from './admin/ViewEmployeeByID';
import ViewLeaves from './admin/ViewLeaves';
import LeaveHistory1 from './employee/LeaveHistory';
import UpdateEmployee from './admin/UpdateEmployee';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainHome/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/employeelogin" element={<Login/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          {/* <Route path="/admin/addtask" element={<AddTask/>} /> */}
          <Route path="/employee/applyleave" element={<ApplyLeave/>} />
          <Route path="/admin/AdminHome" element={<AdminHome/>} />
          <Route path="/admin/addemployee" element={<AddEmployee/>} />
          <Route path="/admin/viewemployees" element={<ViewEmployees/>} />
          <Route path="/employee/EmpHome" element={<EmployeeHome/>} />
          <Route path="/employee/profile" element={<EmployeeProfile/>} />
          <Route path="/admin/viewemployees/viewEmployee/:id" element={<ViewEmployeeByID />} />
          <Route path="/admin/viewleaves" element={<ViewLeaves/>} />
          <Route path="/employee/leaverecords" element={<LeaveHistory1/>} />
          <Route path="/admin/viewemployees/UpdateEmployee/:id" element={<UpdateEmployee/>} />
        </Routes>
        <ToastContainer/>

      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
