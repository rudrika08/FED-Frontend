import React, { useContext, useEffect, useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../context/AuthContext";
import styles from "./styles/Hero.module.scss";
import { parse, differenceInMilliseconds } from "date-fns";
import { Alert, MicroLoading } from "../../../../microInteraction";

function Hero({ ongoingEvents, eventName }) {
  const authCtx = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [info, setInfo] = useState({});
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const navigate = useNavigate();
  const [isMicroLoading, setIsMicroLoading] = useState(false);
  const [relatedEventId, setRelatedEventId] = useState(null);
  const [btnTxt, setBtnTxt] = useState(null);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null);
    }
  }, [alert]);

  const calculateRemainingTime = () => {
    try {
      if (!info.regDateAndTime) return;
      const regStartDate = parse(
        info.regDateAndTime,
        "MMMM do yyyy, h:mm:ss a",
        new Date()
      );
      const now = new Date();
      const timeDifference = differenceInMilliseconds(regStartDate, now);
      if (timeDifference <= 0) {
        setRemainingTime("REGISTER NOW");
        return;
      }
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const remaining =
        days > 0
          ? `${days} day${days > 1 ? "s" : ""} left`
          : `${hours}h ${minutes}m ${seconds}s`;
      setRemainingTime(remaining);
    } catch (error) {
      console.error("Date parsing error:", error);
      setRemainingTime(null);
    }
  };

  useEffect(() => {
    const ongoingInfo = ongoingEvents.find(
      (e) => e.info.relatedEvent === "null"
    )?.info;
    setInfo(ongoingInfo);
    setIsRegistrationClosed(ongoingInfo?.isRegistrationClosed || false);
    const relatedId = ongoingEvents.find(
      (e) => e.info.relatedEvent === "null"
    )?.id;
    setRelatedEventId(relatedId);
    if (ongoingInfo?.regDateAndTime) {
      calculateRemainingTime();
      const intervalId = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [ongoingEvents]);

  const handleButtonClick = () => {
    if (isRegistrationClosed) return;
    if (!authCtx.isLoggedIn) {
      setIsMicroLoading(true);
      sessionStorage.setItem("prevPage", window.location.pathname);
      navigate("/login");
    } else {
      handleForm();
    }
  };

  return (
    <div className={styles.hero}>
      <div className={styles.circle}></div>
      <div className={styles.circle2}></div>
      <Element name="p">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
         
          <p className={styles.head}>FED REPRESENTS</p>
        </motion.div>
      </Element>
      <Element name="img">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/67d7f6b6f12d2942bba0adce_Screenshot_2025-03-17_154354-removebg-preview.png"
            alt="PixelHack Hero"
          />
        </motion.div>
      </Element>
      <div className={styles.text}>
        <p>Design, Develop & Innovate with AI at PixelHack!</p>
        <button onClick={handleButtonClick} disabled={isRegistrationClosed}>
          {remainingTime}
        </button>
      </div>
      <Alert />
    </div>
  );
}

export default Hero;