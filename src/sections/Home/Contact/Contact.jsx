import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/Contact.module.scss';
import contactImg from '../../../assets/images/contact.png';
import { AnimatedBox } from '../../../assets/animations/AnimatedBox';
import { Alert, MicroLoading } from '../../../microInteraction';

const ContactForm = () => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      const response = await axios.post('/api/contact', data);
      console.log('Form submitted successfully:', response.data);
      console.log('Form submitted successfully:', data);

      setTimeout(() => {
        event.target.reset(); // Clear the form fields
        setLoading(false);
      }, 2000);

      setAlert({ 
        type: 'success', 
        message: 'Your message has been submitted!', 
        position: 'bottom-right', 
        duration: 3000 
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setAlert({
        type: 'error',
        message: 'There was an error submitting your message. Please try again.',
        position: 'bottom-right',
        duration: 3000
      });
    }
  };

  return (
    <section id="Contact Us">
      <div className={styles.contactFormContainer}>
        <h2>GET <span className={styles.highlight}>IN</span> TOUCH</h2>
        <div className={styles.bottomLine}></div>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <textarea 
                name="message" 
                placeholder="Message" 
                required>
              </textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? <MicroLoading /> : 'Submit'}
            </button>
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
      {alert && <Alert {...alert} />}
    </section>
  );
};

export default ContactForm;
