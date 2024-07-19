import React, { useState, useContext } from "react";
import axios from "axios";
import { RecoveryContext } from "../../../context/RecoveryContext";
// import Style from "./styles/forgotPassword.module.scss";
import Input from "../../../components/Core/Input";
import Button from "../../../components/Core/Button";
import styles from "../../SignUp/style/Signup.module.scss";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import resetStyle from "./styles/reset.module.scss"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Reset() {
  const { email, setPage } = useContext(RecoveryContext);
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState("");
  const navigate= useNavigate();

  function changePassword(e) {
    e.preventDefault();

    if (password !== cnfPassword) {
      setError("Passwords do not match");
      return;
    }

    // Make POST request to reset password
    axios
      .post("http://localhost:5000/reset_password", {
        email,
        password,
      })
      .then(() => {
        setPage("loginMain")
        toast.success("Password reset successfully");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to reset password");
      });
  }

  return (
    <div>
      <section className={resetStyle.outerdiv}>
      <div onClick={()=>setPage("otp")} className={styles.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
        <div className={styles.circle}>
          <div></div>
        </div>
        <div className={styles.circle1}></div>
        <div className={resetStyle.innerdiv1}>
          <div className={resetStyle.innerTitlediv}>
            <h2 className={resetStyle.innerTitle}>
              Change Password
            </h2>
            <form className={resetStyle.formdiv} onSubmit={changePassword}>
              <div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  label="New Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "98%" }}
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  name="cnfPassword"
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                  required
                  style={{ width: "98%" }}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
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
                type="submit"
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
