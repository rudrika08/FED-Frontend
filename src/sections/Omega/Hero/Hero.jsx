import React from 'react';
import styles from './styles/Hero.module.scss';

function Hero() {
  return (
    <div className={styles.hero}>
        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <p className={styles.head}>FED PRESENTS</p>
        <img src="https://uploads-ssl.webflow.com/663d1907e337de23e83c30b2/66b237c23cd94e1878fff70a_image%20(7).png" alt="" />
        <div className={styles.text}>
          <p>Empowering Entrepreneurs, Energizing the Future</p>
          <button>REGISTER NOW</button>
        </div>
      </div>

  );
}

export default Hero;
