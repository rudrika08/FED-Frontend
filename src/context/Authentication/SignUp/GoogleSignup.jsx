import React from 'react'
import GoogleIcon from "../../assets/images/googleIcon.svg"
import Gscss from "./style/SignupFun.module.scss";

const GoogleSignup = () => {
  return (
    <>
    <div className={Gscss.Gdiv}>
      <img className={Gscss.Icon} src={GoogleIcon}></img>
      
    <p>Sign Up with google</p>
      </div>
    </>
  )
}

export default GoogleSignup