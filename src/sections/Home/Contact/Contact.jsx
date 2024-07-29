import React, { useState, useEffect } from "react";
import usePost from "../../../services/api/usePost";
import styles from "./styles/Contact.module.scss";
import contactImg from "../../../assets/images/contact.png";
import { Button } from "../../../components";
import { AnimatedBox } from "../../../assets/animations/AnimatedBox";
import { Alert, MicroLoading } from "../../../microInteraction";

const ContactForm = () => {
  const [alert, setAlert] = useState(null);
  const [postData, setPostData] = useState(null);
  const [formReset, setFormReset] = useState(false);

  const { isLoading, data, error, success, setTrigger } = usePost(
    "/api/contact",
    postData,
    {},
    "Your message has been submitted! We will get back to you soon.",
    "There was an error submitting your message. Please try again."
  );

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);

  useEffect(() => {
    if (isLoading) return;

    if (success) {
      setAlert({
        type: "success",
        message: success,
        position: "bottom-right",
        duration: 3000,
      });
      setFormReset(true);
    }

    if (error) {
      setAlert({
        type: "error",
        message: error,
        position: "bottom-right",
        duration: 3000,
      });
    }
  }, [isLoading, success, error]);

  useEffect(() => {
    if (formReset) {
      setFormReset(false); // Reset formReset after reset
      document.querySelector("form").reset(); // Reset form fields
    }
  }, [formReset]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setPostData(data); // Set post data
    setTrigger(true); // Trigger the usePost hook
  };

  return (
    <section id="Contact Us">
      <div className={styles.contactFormContainer}>
        <h2>
          GET <span className={styles.highlight}>IN</span> TOUCH
        </h2>
        <div className={styles.bottomLine}></div>
        <div className={styles.formSection}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input type="text" name="name" placeholder="Name" required />
            </div>
            <div className={styles.formGroup}>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <Button
              type="submit"
              style={{
                width: "100%",
                background: "var(--primary)",
                color: "#fff",
                height: "40px",
                marginTop: "20px",
                fontSize: "1rem",
                borderRadius: "15px",
                cursor: "pointer",
              }}
              disabled={isLoading}
            >
              {isLoading ? <MicroLoading /> : "Submit"}
            </Button>
          </form>

          <div className={styles.imageSection}>
            <div className={styles.backCircle}></div>
            <AnimatedBox direction="right">
              <img src={contactImg} alt="Contact" />
            </AnimatedBox>
            <div className={styles.circle}></div>
          </div>
        </div>
      </div>
      <Alert />
    </section>
  );
};

export default ContactForm;
