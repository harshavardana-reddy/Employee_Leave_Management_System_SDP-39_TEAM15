import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";
import NavBar1 from '../navigationbar/NavBar1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'; 

const StyledButton = styled.button`
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
  
  &:hover {
    background: #4C489D;
    color: #fff;
  }
`;

const AdminLogin = () => {
  const [auname, setauname] = useState('');
  const [apwd, setapwd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: auname,
      password: apwd
    }

    try {
      const response = await axios.post("http://localhost:2863/admin/checkadminlogin", data)
      if (response != null) {
        if (response.status === 200) {
          console.log(response.data);
          //navigate("/admin/AdminHome?success=true");
          toast.success("Login successful!");

          setTimeout(() => {
            navigate("/admin/AdminHome");
          }, 1000);
        } else if (response.status === 404) {
          console.log("Invalid Credentials");
          
        } else {
          console.log("Server Error");
        }
      }
    } catch (e) {
      console.log(e.message);
      toast.error("Invalid Credentials");
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'Raleway, sans-serif',
      background: 'linear-gradient(90deg, #C7C5F4, #776BCC)',
      backgroundAttachment: 'fixed'
    },
    screen: {
      background: 'linear-gradient(90deg, #5D54A4, #7C78B8)',
      position: 'relative',
      height: '600px',
      width: '360px',
      boxShadow: '0px 0px 24px #5C5696'
    },
    screenContent: {
      zIndex: 1,
      position: 'relative',
      height: '100%'
    },
    screenBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      WebkitClipPath: 'inset(0 0 0 0)',
      clipPath: 'inset(0 0 0 0)'
    },
    backgroundShape: {
      transform: 'rotate(45deg)',
      position: 'absolute'
    },
    shape1: {
      height: '520px',
      width: '520px',
      background: '#FFF',
      top: '-50px',
      right: '120px',
      borderRadius: '0 72px 0 0'
    },
    shape2: {
      height: '220px',
      width: '220px',
      background: '#6C63AC',
      top: '-172px',
      right: 0,
      borderRadius: '32px'
    },
    shape3: {
      height: '540px',
      width: '190px',
      background: 'linear-gradient(270deg, #5D54A4, #6A679E)',
      top: '-24px',
      right: 0,
      borderRadius: '32px'
    },
    shape4: {
      height: '400px',
      width: '200px',
      background: '#7E7BB9',
      top: '420px',
      right: '50px',
      borderRadius: '60px'
    },
    login: {
      width: '320px',
      padding: '30px',
      paddingTop: '156px'
    },
    loginField: {
      padding: '20px 0px',
      position: 'relative'
    },
    loginIcon: {
      position: 'absolute',
      top: '30px',
      color: '#7875B5'
    },
    loginInput: {
      border: 'none',
      borderBottom: '2px solid #D1D1D4',
      background: 'none',
      padding: '10px',
      paddingLeft: '24px',
      fontWeight: '700',
      width: '75%',
      transition: '.2s'
    },
    title: {
      fontSize: '50px',
      color: '#fff', // Example color
      textAlign: 'center', // Example alignment
      marginBottom: '20px', // Example margin bottom
    },
  };

  return (
    <div>
      <NavBar1/>
    <div style={styles.container}>
    <motion.span style={{ ...styles.title, ...styles.customTitleStyles }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          transition={{ duration: 0.50 }}
        >
          Welcome to Admin Login
        </motion.span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div style={styles.screen}>
        <div style={styles.screenContent}>
          <form style={styles.login} onSubmit={handleSubmit}>
            <div style={styles.loginField}>
              <i style={styles.loginIcon} className="fas fa-user"></i>
              <input type="text" style={styles.loginInput} placeholder="Username" onChange={(e) => setauname(e.target.value)} />
            </div>
            <div style={styles.loginField}>
              <i style={styles.loginIcon} className="fas fa-lock"></i>
              <input type="password" style={styles.loginInput} placeholder="Password" onChange={(e) => setapwd(e.target.value)} />
            </div>
            <StyledButton type='submit'>Log in</StyledButton>
          </form>
        </div>
        <div style={styles.screenBackground}>
          <span style={{ ...styles.backgroundShape, ...styles.shape4 }}></span>
          <span style={{ ...styles.backgroundShape, ...styles.shape3 }}></span>
          <span style={{ ...styles.backgroundShape, ...styles.shape2 }}></span>
          <span style={{ ...styles.backgroundShape, ...styles.shape1 }}></span>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default AdminLogin;
