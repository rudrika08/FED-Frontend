import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/Signup.module.scss";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import google from "../../assets/images/google.png";
import users from "../../data/user.json";
import { Alert } from "../../microInteraction";

export default function GoogleSignup() {
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

      const userInfo = googleResponse.data;
      const email = userInfo.email;

      const data = {
        email: userInfo.email,
        image: userInfo.picture,
      };

      console.log("Google User Data:", data);
      const user = users.find((user) => user.email === data.email);

      if (user) {
        // setAlert({
        //   type: "info",
        //   message: "Already registered. Please log in.",
        //   position: "bottom-right",
        //   duration: 3000,
        // });
        setNavigatePath("/login");
        setShouldNavigate(true);
        // setTimeout(() => {
        //   setShouldNavigate(true);
        // }, 3000);
      } else {
        // User is not registered, navigate to CompleteProfile with state
        navigate("/completeProfile", { state: { data: userInfo } });
      }
    } catch (error) {
      console.error("Login error:", error);
      // setAlert({
      //   type: "info",
      //   message: "An error occurred during login. Please try again.",
      //   position: "bottom-right",
      //   duration: 3000,
      // });
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
      className={styles.google_btn}
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
      <span>Sign Up with Google</span>
    </button>
    <Alert />
    </>
  );
}
