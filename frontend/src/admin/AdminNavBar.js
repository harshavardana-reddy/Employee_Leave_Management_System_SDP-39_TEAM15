import React from 'react';
import { Link } from 'react-router-dom';

// Define the Menu function
const Menu = () => {
  // Define the functionality for the menu
  console.log('Menu clicked');
};

export default function AdminNavBar() {
  return (
    <div className="navbar bg-lightblue border-b-2 border-gray-400 rounded-lg" style={{backgroundColor:'gray'}} >
      <div className="flex-1 flex" align="center">
        <a className="btn btn-ghost text-xl" style={{ textAlign: 'left' }}>Employee Leave Management System</a>
        <a className="btn btn-ghost text-xl " style={{ marginLeft:'485px' }}>Admin-Portal</a>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/admin/AdminHome" >Home</Link></li>
          <li>
        <details>
          <summary>
            Employee
          </summary>
          <ul className="p-2 bg-base-100 rounded-t-none">
            <li><Link to="/admin/addemployee" >Add Employee</Link></li>
            <li><Link to="/admin/viewemployees"  >View Employees</Link></li>
            
          </ul>
        </details>
      </li>
          {/* <li><Link to="/admin/viewleaves" >Leaves</Link></li> */}
          {/* <li><Link to="/admin/tasks" >Tasks</Link></li> */}
          <li>
        <details>
          <summary>
           Leave
          </summary>
          <ul className="p-2 bg-base-100 rounded-t-none">
            <li><Link to="/admin/viewleaves" >Leaves Applied</Link></li>
            <li><Link to=""  >Leave Analysis</Link></li>
          </ul>
        </details>
      </li>
          <li><Link to="/adminlogin" >Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}
