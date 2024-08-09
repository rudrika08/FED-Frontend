import React from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import styles from './styles/Hero.module.scss';

function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.circle}></div>
      <div className={styles.circle2}></div>
      <Element name="p">
      <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
      <p className={styles.head}>FED PRESENTS</p>
      </motion.div>
      </Element>
      <Element name="img">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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
        <button>REGISTER NOW</button>
      </div>
    </div>
  );
}

export default Hero;
