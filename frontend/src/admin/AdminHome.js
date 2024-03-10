import React, { useEffect } from 'react';
import AdminNavBar from './AdminNavBar'
import { ToastContainer, toast } from 'react-toastify';
import image21 from '../components/images/21.png'; // Import the image
import Typed from 'typed.js'; 
import CanvasJSReact from '@canvasjs/react-charts';
export default function AdminHome() {

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed('#typed-text', {
      strings: ['Welcome To Employee Leave Management System'], // Add your text here
      typeSpeed: 50, // Typing speed in milliseconds
      loop: false, // Whether to loop the typing animation
    });
    const typed1 = new Typed('#typed-text2', {
      strings: ['This is Admin-Portal'], // Add your text here
      typeSpeed: 50, // Typing speed in milliseconds
      loop: false, // Whether to loop the typing animation
    });

    // Cleanup function
    return () => {
      typed.destroy();
      typed1.destroy();
    };

  }, []);


  return (
    
    <div>
        <AdminNavBar/>
        <div className="container mx-auto">
        <h1 className="text-3xl font-bold mt-8 text-center">
          <span id="typed-text"></span> {/* Placeholder for typed text */}
        </h1>
        <p className="mt-4 text-center">
          
        </p>
        <div className="flex justify-center">
          <img src={image21} alt="Employee Leave Management System" className="mt-8 max-w-full h-auto lg:max-w-none lg:h-auto" />
        </div>
        <h1 className="text-3xl font-bold mt-8 text-center">
          <span id="typed-text2"></span> {/* Placeholder for typed text */}
        </h1>
        <p className="mt-4 text-center">
          
        </p>
        
      </div>
    </div>
  )
}
