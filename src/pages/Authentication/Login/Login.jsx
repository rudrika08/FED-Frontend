import React, { useState } from "react";
import style from "./styles/Login.module.scss";
import Input from "../../../components/Core/Input";
import Button from "../../../components/Core/Button";
import Text from "../../../components/Core/Text";
import google from "../../../assets/images/google.png";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = () => {
    if(email === "" || password === ""){
      alert("Please fill all the fields")
    }else{
      console.log({email,password})
    }
  }
  return (
    <div>
      <div className={style.container}>
        <div className={style.login}>
          <h1>Login</h1>
          <Button
            style={{
              width: "100%",
              backgroundColor: "transparent",
              color: "#fff",
              height: "40px",
              marginTop: "20px",
              fontSize: ".77rem",
              cursor: "pointer",
              border: "1px solid #fff",
            }}
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
          </Button>
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
          <form>
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
              onChange={(e) => setpassword(e.target.value)}
              required
              style={{
                width: "98%",
              }}
            />
            <Text
              variant="secondary"
              style={{
                fontSize: "0.7rem",
              }}
            >
              Forget Password?
            </Text>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#ff6b00",
                color: "#fff",
                height: "40px",
                marginTop: "20px",
                fontSize: "1rem",
                cursor: "pointer",
                border: "1px solid #fff",
              }}
              onClick={(e) => {
                handleLogin()
              }}
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
                style={{
                  color: "#FF8A00",
                }}
              >
                Sign Up
              </a>
            </Text>
          </form>
        </div>
        <div className={style.sideImage}></div>
      </div>
    </div>
  );
};

export default Login;
