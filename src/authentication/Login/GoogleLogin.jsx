import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../SignUp/style/Signup.module.scss";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import users from "../../data/user.json";
import AuthContext from "../../context/AuthContext";
import google from "../../assets/images/google.png";
import { Alert } from "../../microInteraction";

export default function GoogleLogin() {
  const [alert, setAlert] = useState(null);
  const [codeResponse, setCodeResponse] = useState(null);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigatePath, setNavigatePath] = useState("/");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setCodeResponse(tokenResponse),
    onError: (error) => console.error("Login failed:", error),
  });

  useEffect(() => {
    if (codeResponse) {
      handleLoginSuccess();
    }
  }, [codeResponse]);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate(navigatePath);
      setShouldNavigate(false); // Reset state after navigation
    }
  }, [shouldNavigate, navigatePath, navigate]);

  const handleLoginSuccess = async () => {
    try {
      const googleResponse = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`
      );

      const data = {
        email: googleResponse.data.email,
        image: googleResponse.data.picture,
      };

      console.log("Google User Data:", data);

      const user = users.find((user) => user.email === data.email);

      if (user) {
        console.log("User found:", user);

        authCtx.login(
          user.name,
          user.email,
          data.image,
          user.rollNo,
          user.school,
          user.college,
          user.mobileNo,
          user.year,
          user.regForm,
          user.access,
          "someToken",
          3600000
        );

        setAlert({
          type: "success",
          message: "Login successful",
          position: "bottom-right",
          duration: 3000,
        });
        setNavigatePath(sessionStorage.getItem("prevPage") || "/");
        sessionStorage.removeItem("prevPage"); // Clean up

        setTimeout(() => {
          setShouldNavigate(true);
        }, 3000);
        
      } else {
        setAlert({
          type: "info",
          message: "User Not Registered, Kindly Register First",
          position: "bottom-right",
          duration: 3000,
        });
        setNavigatePath("/signup");
        setTimeout(() => {
          setShouldNavigate(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        type: "error",
        message: "There was an error logging in. Please try again.",
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <button
        style={{
          backgroundColor: "transparent",
          color: "#fff",
          height: "40px",
          marginTop: "20px",
          fontSize: ".77rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={style.google_btn}
        onClick={login}
      >
        <img
          src={google}
          alt="google"
          style={{
            width: "18px",
            height: "18px",
            marginRight: "6px",
          }}
        />
        <span>Login with Google</span>
      </button>
      <Alert />
    </>
  );
}
