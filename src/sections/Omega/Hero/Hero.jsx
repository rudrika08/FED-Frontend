import React, { useContext, useEffect, useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import styles from "./styles/Hero.module.scss";
import {Alert, MicroLoading} from "../../../microInteraction"; // Ensure this import path is correct

function Hero({ ongoingEvents, isRegisteredInRelatedEvents, eventName }) {
  const authCtx = useContext(AuthContext);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [navigatePath, setNavigatePath] = useState("/");
  const [isMicroLoading, setIsMicroLoading] = useState(false);

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

  const handleButtonClick = () => {
    if (!authCtx.isLoggedIn) {
      setIsMicroLoading(true);
      sessionStorage.setItem("prevPage", window.location.pathname);
      setNavigatePath("/login");
      setShouldNavigate(true);
    } else {
      handleForm();
    }
  };

  const handleForm = () => {
    if (authCtx.isLoggedIn) {
      setIsMicroLoading(true);
      if (authCtx.user.access !== "USER") {
        setTimeout(() => {
          setIsMicroLoading(false);
          setAlert({
            type: "info",
            message: "Team Members are not allowed to register for the Event",
            position: "bottom-right",
            duration: 3000,
          });
        }, 1500);
      } else {
        console.log("ongoingEvents:", ongoingEvents);
        const relatedEventId = ongoingEvents.find(
          (e) => e.info.relatedEvent === "null"
        )?.id;
        console.log("relatedEventId:", relatedEventId);
        if (relatedEventId) {
          setNavigatePath(`/Events/${relatedEventId}/Form`);
          setShouldNavigate(true);
        }
        setTimeout(() => {
          setIsMicroLoading(false);
        }, 3000);
      }
    }
  };

  const buttonText = !authCtx.isLoggedIn
    ? "REGISTER NOW"
    : isRegisteredInRelatedEvents
    ? "ALREADY REGISTERED"
    : "REGISTER NOW";

  return (
    <div className={styles.hero}>
      <div className={styles.circle}></div>
      <div className={styles.circle2}></div>
      <Element name="p">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <p className={styles.head}>FED PRESENTS</p>
        </motion.div>
      </Element>
      <Element name="img">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <img
            src="https://uploads-ssl.webflow.com/663d1907e337de23e83c30b2/66b237c23cd94e1878fff70a_image%20(7).png"
            alt="Hero"
          />
        </motion.div>
      </Element>
      <div className={styles.text}>
        <p>Empowering Entrepreneurs, Energizing the Future</p>
        <button
          onClick={handleButtonClick}
          disabled={buttonText === "ALREADY REGISTERED"}
          style={{
            cursor:
              buttonText === "ALREADY REGISTERED" ? "not-allowed" : "pointer",
          }}
        >
          {isMicroLoading && buttonText === "REGISTER NOW" ? (
            <MicroLoading color="#38ccff" />
          ) : (
            buttonText
          )}
        </button>
      </div>
      <Alert />
    </div>
  );
}

export default Hero;
