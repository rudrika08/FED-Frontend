import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { RecoveryContext } from "../../../context/RecoveryContext";
import style from "./styles/forgotPassword.module.scss";
import Button from "../../../components/Core/Button";
import styles from "../../SignUp/style/Signup.module.scss";
import otpstyle from "./styles/OTPInput.module.scss"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const inputRefs = useRef([]);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", { OTP: otp, recipient_email: email })
      .then(() => {
        setDisable(true);
        alert("A new OTP has successfully been sent to your email.");
        setTimer(60);
      })
      .catch(console.error);
  }

  function verifyOTP() {
    // Convert OTPinput array to string for comparison
    const enteredOTP = OTPinput.join("");

    console.log("Entered OTP:", enteredOTP);
    console.log("Expected OTP:", otp);

    if (enteredOTP === String(otp)) {
      setPage("reset");
    } else {
      alert("The code you have entered is not correct, try again or re-send the link");
    }
  }

  // Effect to manage timer and resend button


  useEffect(()=>{
    console.log("OtpINputPage");
    console.log(otp);
  },[])
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false); // Enable resend button
        }
        return lastTimerCount <= 0 ? lastTimerCount : lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  // Function to handle input changes
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOTPinput = [...OTPinput];
      newOTPinput[index] = value;
      setOTPinput(newOTPinput);
      if (value !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Function to handle backspace key
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !OTPinput[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className={otpstyle.outerBox}>
      <div className={styles.circle}>
        <div></div>
      </div>
      <div className={styles.circle1}></div>
      <div onClick={()=>setPage("SendOtp")} className={styles.ArrowBackIcon}>
            <ArrowBackIcon />
          </div>
      <div className={otpstyle.innerBox1}>
        <div className={otpstyle.innerBox2}>
          <div className={otpstyle.innerTitle}>
            <div className={otpstyle.innerTitlediv}>
              <p className={style.verifyTitle}>Email Verification</p>
            </div>
            <div className={otpstyle.innerTitle2}>
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>
          <div>
            <form>
              <div className={otpstyle.formdiv1}>
                <div className={otpstyle.otpcontainer}>
                  {OTPinput.map((_, index) => (
                    <div className={otpstyle.otpBox} key={index}>
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength="1"
                        className={otpstyle.singleInput}
                        type="text"
                        value={OTPinput[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    </div>
                  ))}
                </div>
                <div className={otpstyle.buttondiv}>
                  <div>
                    <Button
                      onClick={verifyOTP}
                      style={{
                        width: "94%",
                        background: "var(--primary)",
                        color: "#fff",
                        height: "45px",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      className={style.button}
                    >
                      Verify Email
                    </Button>
                  </div>
                  <div className={otpstyle.innerdiv3}>
                    <p className={style.emailTitle}>Didn't receive code?</p>
                    <button
                      type="button"
                      className={otpstyle.button}
                      style={{
                        color: disable ? "gray" : "white",
                        cursor: disable ? "none" : "pointer",
                        textDecorationLine: disable ? "none" : "underline",
                      }}
                      onClick={resendOTP}
                      disabled={disable}
                    >
                      {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
