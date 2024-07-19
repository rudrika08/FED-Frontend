import React, { createContext, useState, useEffect } from 'react';
import SendOtp from '../authentication/Login/ForgotPassword/SendOtp';
import OTPInput from '../authentication/Login/ForgotPassword/OTPInput';

import Reset from '../authentication/Login/ForgotPassword/Reset';

export const RecoveryContext = createContext();

const componentMap = {
  SendOtp: SendOtp,
  otp: OTPInput,
  reset: Reset,
};

const initialContext = {
  page: 'loginMain', // Initial page to render
  email: '',
  otp: '',
};

const RecoveryContextProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const storedEmail = localStorage.getItem('recoveryEmail') || '';
    const storedOTP = localStorage.getItem('recoveryOTP') || '';
    const storedPage = localStorage.getItem('recoveryPage') || initialContext.page;
    return {
      ...initialContext,
      email: storedEmail,
      otp: storedOTP,
      page: storedPage,
    };
  });

  const setPage = (newPage) => {
    localStorage.setItem('recoveryPage', newPage);
    setState(prevState => ({ ...prevState, page: newPage }));
  };

  const setEmail = (newEmail) => {
    localStorage.setItem('recoveryEmail', newEmail);
    setState(prevState => ({ ...prevState, email: newEmail }));
  };

  const setOTP = (newOTP) => {
    localStorage.setItem('recoveryOTP', newOTP);
    setState(prevState => ({ ...prevState, otp: newOTP }));
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('recoveryEmail');
      localStorage.removeItem('recoveryOTP');
      localStorage.removeItem('recoveryPage');
    };
  }, []);

  return (
    <RecoveryContext.Provider value={{ ...state, setPage, setEmail, setOTP }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export default RecoveryContextProvider;
