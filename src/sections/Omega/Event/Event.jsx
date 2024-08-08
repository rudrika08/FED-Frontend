/* eslint-disable react/prop-types */
import React from 'react';
import styles from './styles/Event.module.scss';
import data from '../../../data/omega/Event.json';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function OmegaEventCard({ title, desc }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={styles.card}
    >
      <div className={styles.cut}></div>
      <div className={styles.card_img}>
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230530/pngtree-thai-bangkaew-dog-doggy-puppy-photo-image_2798211.jpg"
          alt="Event Image"
        />
      </div>
      <div className={styles.card_content}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <button>Register Now</button>
        <div className={styles.cut2}></div>
      </div>
    </motion.div>
  );
}

function Event() {
  return (
    <>
      <div className={styles.eventBox}>
        <div className={styles.eventHeading}>
          <h1>YOUR NEXT BIG IDEA DESERVES A <br /> GRAND STAGE!</h1>
        </div>
        <div className={styles.eventCards}>
          <div className={styles.cardItem}>
            {data.map((item, index) => (
              <OmegaEventCard key={index} title={item.title} desc={item.desc} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
