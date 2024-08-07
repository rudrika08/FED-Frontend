import React from 'react';
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import styles from './styles/Omega.module.scss';
import Hero from '../../sections/Omega/Hero/Hero.jsx';
import Accordion from '../../sections/Omega/Accordion/Accordion';
import Sponsors from '../../sections/Omega/Sponsors/Sponsors';
import Event from "../../sections/Omega/Event/Event.jsx";
import TeamImage from "../../sections/Omega/TeamImage/TeamImage.jsx";
import Attend from "../../sections/Omega/Attend/Attend.jsx";

function Omega() {
  // Create refs for each section
  const { ref: eventRef, inView: eventInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: attendRef, inView: attendInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: sponsorsRef, inView: sponsorsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: accordionRef, inView: accordionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: teamImageRef, inView: teamImageInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className={styles.body}>
      <Hero />
      <Element name="Event">
        <motion.div
          ref={eventRef}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={eventInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <Event />
        </motion.div>
      </Element>
      <Element name="Attend">
        <motion.div
          ref={attendRef}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={attendInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <Attend />
        </motion.div>
      </Element>
      <Element name="Sponsors">
        <motion.div
          ref={sponsorsRef}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={sponsorsInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <Sponsors />
        </motion.div>
      </Element>
      <Element name="Accordion">
        <motion.div
          ref={accordionRef}
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={accordionInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <Accordion />
        </motion.div>
      </Element>
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
    </div>
  );
}

export default Omega;
