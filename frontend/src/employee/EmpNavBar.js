import React from 'react';
import { Link } from 'react-router-dom';

export default function EmpNavBar() {
  return (
    <div className="navbar bg-lightblue border-b-2 border-gray-400 rounded-lg" style={{ backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem' }}>
      <div className="flex-1 flex" align="center">
        <a className="btn btn-ghost text-xl" style={{ textAlign: 'left' }}>Employee Leave Management System</a>
        <a className="btn btn-ghost text-xl " style={{ marginLeft:'485px' }}>Employee-Portal</a>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/employee/EmpHome">Home</Link></li>
          {/* <li><Link to="/about"></Link></li> */}
          <li>
        <details>
          <summary>
           Leave
          </summary>
          <ul className="p-2 bg-base-100 rounded-t-none">
            <li><Link to="/employee/applyleave" >Apply Leave</Link></li>
            <li><Link to="/employee/leaverecords">Leave History</Link></li>
          </ul>
        </details>
      </li>
          <li><Link to="/employee/profile">Profile</Link></li>
          <li><Link to="/employeelogin">logout</Link></li>
        </ul>
      </div>
    </div>
  );
}
