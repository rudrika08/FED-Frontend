import React, { useState } from 'react';
import styles from './styles/Accordion.module.scss';
import data from '../../../data/omega/Accordion.json';

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
      {Array.isArray(data) && data.map((item, index) => (
        <div key={index} className={styles.card}>
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
              <div className={`${styles.cut2}`}></div>
            </div>
          </div>
          <div className={`${styles.cut2}`} style={{ display: activeIndex === index ? 'none' : 'block' }}></div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
