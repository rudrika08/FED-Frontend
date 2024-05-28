import React from 'react';
import { CarouselImg } from '../../data/carouselImages';
import styles from './Styles/Sponser.module.scss';

const SponserCard = ({ image }) => {
  return (
    <div className={styles.sponser_card}>
      <img src={image.image} className={styles.SponserCard_image} alt={image.title} />
    </div>
  );
};

const Sponsered = () => {
  return (
    <div className={styles.sponser_all}>
      {CarouselImg.map((image, index) => (
        <div key={index}>
          <SponserCard image={image} />
        </div>
      ))}
    </div>
  );
};

export default Sponsered;
