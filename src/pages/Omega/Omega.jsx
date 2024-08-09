import React from 'react';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import styles from './styles/Omega.module.scss';
import Hero from '../../sections/Omega/Hero/Hero.jsx';
import Accordion from '../../sections/Omega/Accordion/Accordion';
import Sponsors from '../../sections/Omega/Sponsors/Sponsors';
import Event from "../../sections/Omega/Event/Event.jsx";
import TeamImage from "../../sections/Omega/TeamImage/TeamImage";
import Attend from "../../sections/Omega/Attend/Attend";
import { ChatBot } from '../../features';

function Omega() {
  const { ref: teamImageRef, inView: teamImageInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className={styles.body}>
      <Hero />
      <Event />
      <Attend />
      <Sponsors />
      <Accordion />
      <Element name="TeamImage">
        <motion.div
          ref={teamImageRef}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={teamImageInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <TeamImage />
        </motion.div>
      </Element>
      <div>
        <ChatBot />
        <h1 style={{ margin: '8rem' }}>Currently in Development</h1>
      </div>
    </div>
  );
}

export default Omega;
