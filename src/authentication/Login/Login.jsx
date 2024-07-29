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
  const { setEmail } = useContext(RecoveryContext);
  const authCtx = useContext(AuthContext);

  const [email, setemail] = useState("");
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
    setEmail(email);
    navigate('/ForgotPassword')
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
          <h1
            style={{
              paddingTop: "10px",
              background: "var(--primary)",
              width: "20%",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
          >
            Login
          </h1>
          <GoogleLogin />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:"1rem"
            }}
          >
            <div className={style.divider} />
            <p style={{ color: "#fff", textAlign: "center" , marginBottom:"0.2rem" }}>or</p>
            <div className={style.divider} />
          </div>
          <form className={style.form}>
            <Input
              type="text"
              placeholder="eg:something@gmail.com"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
                width: "98%",
                background: "var(--primary)",
                color: "#fff",
                height: "40px",
                marginTop: "20px",
                fontSize: "1rem",
                cursor: "pointer",
                marginLeft:"0.4rem"
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Text
              style={{
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "14px",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
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
              </Link>
            </Text>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
