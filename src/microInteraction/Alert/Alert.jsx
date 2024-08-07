/* eslint-disable no-unused-vars */
import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const Alert = ({ type, message, position, duration, style }) => {
  const notify = () => {
    const defaultStyle = {
      borderRadius: '5px',
      padding: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
    };

    const mobileStyle = window.innerWidth <= 768 ? {
      marginBottom: '2rem',
    } : {};

    const options = {
      position: position || 'top-right',
      autoClose: duration || 5000,
      style: { ...defaultStyle, ...style, ...mobileStyle },
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    const toastId = "custom-id";

    if (!toast.isActive(toastId)) {
      switch (type) {
        case 'success':
          toast.success(message, { 
            ...options, 
            style: { 
              ...defaultStyle, 
              ...style, 
              ...mobileStyle,
              border: '1.5px solid green',
              backgroundColor: '#d3f9d3', 
              color: '#198754' 
            },  
            toastId });
          break;
        case 'error':
          toast.error(message, { 
            ...options, 
            style: { 
              ...defaultStyle, 
              ...style, 
              ...mobileStyle,
              border: '1.5px solid red',
              backgroundColor: '#FADADD', 
              color: 'red' 
            },
            toastId });
          break;
        case 'info':
          toast.info(message, { 
            ...options, 
            style: { 
              ...defaultStyle, 
              ...style, 
              ...mobileStyle 
            }, 
            toastId });
          break;
        case 'warning':
          toast.warning(message, { 
            ...options, 
            style: { 
              ...defaultStyle, 
              ...style, 
              ...mobileStyle 
            }, 
            toastId });
          break;
        default:
          toast(message, { 
            ...options, 
            style: { 
              ...defaultStyle, 
              ...style, 
              ...mobileStyle 
            }, 
            toastId });
          break;
      }
    }
  };

  if (message) {
    notify();
  }

  return <ToastContainer transition={Slide} />;
};

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  position: PropTypes.string,
  duration: PropTypes.number,
  style: PropTypes.object,
};

export default Alert;
