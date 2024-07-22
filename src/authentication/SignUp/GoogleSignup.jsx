import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/Signup.module.scss";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import google from "../../assets/images/google.png";
import users from "../../data/user.json";

export default function GoogleSignup() {
  const [codeResponse, setCodeResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
        // User is already registered
        alert("Already registered. Please log in.");
        navigate("/login");
      } else {
        // User is not registered, navigate to CompleteProfile with state
        navigate("/completeProfile", { state: { data: userInfo } });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
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
  );
}
