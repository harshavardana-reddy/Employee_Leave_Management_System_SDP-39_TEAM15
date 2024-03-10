import React from 'react';

const DialogBox = ({ isOpen, onClose, message }) => {
  return (
    <div style={dialogContainerStyle(isOpen)}>
      <div style={dialogContentStyle}>
        <div style={dialogMessageStyle}>{message}</div>
        <button style={buttonStyle} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Inline styles
const dialogContainerStyle = (isOpen) => ({
  display: isOpen ? 'flex' : 'none',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 9999,
  justifyContent: 'center',
  alignItems: 'center'
});

const dialogContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
};

const dialogMessageStyle = {
  marginBottom: '10px'
};

const buttonStyle = {
  marginTop: '10px'
};

export default DialogBox;
