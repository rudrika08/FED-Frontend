import React, { useState } from 'react';
import styles from './styles/Accordion.module.scss';
import data from '../../../data/omega/Accordion.json';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  console.log(data); 

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
        <h1>FREQUENTLY ASKED <span>QUESTION</span></h1>
      {Array.isArray(data) && data.map((item, index) => (
        <div key={index} className={styles['accordion-item']}>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
