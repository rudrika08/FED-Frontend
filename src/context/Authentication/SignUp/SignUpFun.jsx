import React from 'react'
import SignUpForm from './SignUpForm'
import sics from "./style/SignupFun.module.scss";
const SignUpFun = () => {
  return (
    <>
  
    <div className={sics.SignUpPage}>
      <div className={sics.maindiv}>
        <div className={sics.leftdiv}>  <SignUpForm /></div>
        <div className={sics.rightdiv}></div>
      </div>
    </div>
    </>
  )
}

export default SignUpFun