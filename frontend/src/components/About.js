import React from 'react';
import NavBar1 from '../navigationbar/NavBar1';
import './about.css'

export default function About() {
  return (
    <div>
      <NavBar1 />
      <div className="container mx-auto" align="center" id="about">
        <h1 className="text-3xl font-bold mt-8">About</h1>
        <p className="mt-4" style={{fontFamily:'Times New Roman',fontWeight:'bolder'}}>
        The system is built on the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. MongoDB serves as the database, Express.js for server-side development, React.js for frontend development, and Node.js for server-side scripting.
        <br/>
        Features:
        <ol style={{textJustify:'-moz-initial'}}>
          <li>User authentication enables employees to sign in securely and access leave-related information.</li>
          <li>Leave Requests: Employees can submit leave requests specifying the type of leave (e.g., sick leave, vacation), duration, and reason.</li>
          <li>Leave Balances: The system monitors and shows employees' leave balances, including accumulated, taken, and available leave.</li>
          <li>Notifications: Employees receive automated notifications when their leave requests are submitted, approved, or rejected.</li>
          <li>Calendar Integration: Using calendar systems to present leave schedules and availability.</li>
          <li>Reporting and Analytics: Provides statistics and analytics on leave utilization, trends, and patterns to help with decision-making and resource planning.</li>
        </ol>

        Accessibility and Usability: The system is intended to be user-friendly, with a simple interface for navigation and interaction. It prioritizes accessibility so that all users, regardless of ability, may effectively use the system.
        <br/>
Scalability and Performance: The system was designed with scalability in mind, so it can accommodate increasing numbers of users and data volumes. It is designed for performance, with rapid data retrieval and processing to reduce latency and improve user experience.
<br/>
Security: Uses strong security measures to secure critical employee data and prevent unauthorized access. Data confidentiality and integrity are ensured by the use of encryption, secure authentication procedures, and role-based access control (RBAC).
<br/>

Contributor: This project is directed by Mr. Jonnalaggadda Surya Kiran and developed by K. Sanjay and P. Harshavardana Reddy.
        




        </p>
      </div>
    </div>
  );
}
