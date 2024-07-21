import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./styles/Login.module.scss";
import Input from "../../components/Core/Input";
import Button from "../../components/Core/Button";
import Text from "../../components/Core/Text";
import users from "../../data/user.json";
import AuthContext from "../../context/AuthContext";
import { RecoveryContext } from "../../context/RecoveryContext";
import GoogleLogin from "./GoogleLogin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const navigate = useNavigate();
  const { setPage } = useContext(RecoveryContext);
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      authCtx.login(
        user.name,
        user.email,
        user.pic,
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

      const prevPage = sessionStorage.getItem("prevPage") || "/";
      sessionStorage.removeItem("prevPage"); // Clean up
      navigate(prevPage);
      alert("Login successful");
      
    } else {
      alert("Invalid email or password");
    }
  };

  const handleForgot = () => {
    setPage("SendOtp");
  };

  return (
    <div>
      <div className={style.container}>
        <Link to={"/"}>
          <div className={style.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
        </Link>
        <div className={style.circle}>
          <div></div>
        </div>
        <div className={style.circle1}></div>
        <div className={style.login}>
          <h1>Login</h1>
          <GoogleLogin />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0 4px 0",
            }}
          >
            <div className={style.divider} />
            <p style={{ color: "#fff", textAlign: "center" }}>or</p>
            <div className={style.divider} />
          </div>
          <form className={style.form}>
            <Input
              type="text"
              placeholder="eg:something@gmail.com"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "98%",
              }}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "98%",
              }}
            />
            <Text
              onClick={handleForgot}
              variant="secondary"
              style={{
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              Forget Password?
            </Text>
            <Button
              style={{
                width: "100%",
                background: "var(--primary)",
                color: "#fff",
                height: "40px",
                marginTop: "20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Text
              style={{
                fontSize: "0.7rem",
                textAlign: "center",
                marginTop: "14px",
              }}
            >
              Don't have an account?{" "}
              <a
                href="/signup"
                onClick={(e) => {
                  sessionStorage.setItem("prevPage", window.location.pathname);
                }}
                style={{
                  background: "var(--primary)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Sign Up
              </a>
            </Text>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
