import { useEffect } from 'react';
import { SponserImg } from '../../../data/SponserImages';
import styles from './styles/Sponser.module.scss';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponser = () => {

  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2 } },
    hidden: { opacity: 0, scale: 0 }
  };

  const AnimatedBox = ({ children }) => {
    const control = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: false,
      threshold: 0.3,
    });

    useEffect(() => {
      if (inView) {
        control.start('visible');
      } else {
        control.start('hidden');
      }
    }, [control, inView]);

    return (
      <motion.div
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={control}
      >
        {children}
      </motion.div>
    );
  };

  const SponserCard = ({ image }) => {
    return (
      <div className={styles.sponser_card}>
        <img src={image.image} className={styles.SponserCard_image} alt={image.title} />
      </div>
    );
  };

  return (
    <>
      <div className={styles.sponser_title}>
        our <span className={styles.sponser_title2}>Sponsors</span>
      </div>
      <div className={styles.bottom_line}></div>
      <div className={styles.sponser_container}>
        <div className={styles.sponser_continer2}>
          <div className={styles.sponser_all}>
            {SponserImg.map((image, index) => (
              <div key={index}>
                <AnimatedBox>
                  <SponserCard image={image} />
                </AnimatedBox>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponser;
