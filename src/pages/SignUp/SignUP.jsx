import React from 'react'
import { useEffect } from 'react'
import SignUpFun from '../../components/SignUp/SignUpFun'

const SignUP = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
  return (
    <>
    <SignUpFun />
    </>
  )
}

export default SignUP

