/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './styles/Accordion.module.scss';
import data from '../../../data/omega/Accordion.json';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.title}>
        <h1>FREQUENTLY ASKED <span>QUESTION</span></h1>
      </div>
      {Array.isArray(data) && data.map((item, index) => {
        const { ref, inView } = useInView({
          threshold: 0.1,
          triggerOnce: true,
        });

        return (
          <motion.div
            key={index}
            className={styles.card}
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={styles.cut}></div>
            <div className={styles['accordion-item']}>
              <div
                className={styles['accordion-title']}
                onClick={() => toggleAccordion(index)}
              >
                <p>{item.title}</p>
                <span>{activeIndex === index ? '-' : '+'}</span>
              </div>
              <div
                className={`${styles['accordion-content']} ${activeIndex === index ? styles.active : ''}`}
              >
                {item.content}
                <div className={styles.cut2}></div>
              </div>
            </div>
            <div className={styles.cut2} style={{ display: activeIndex === index ? 'none' : 'block' }}></div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Accordion;
