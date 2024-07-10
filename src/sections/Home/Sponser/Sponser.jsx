import React, { useState, useEffect } from 'react';
import SponserImg from '../../../data/Sponser.json';
import styles from './styles/Sponser.module.scss';
import Carousel from '../../../components/Carousel/Carousel';

const Sponser = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 480) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(12);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const groupSponserCards = () => {
    const groupedSponsers = [];
    for (let i = 0; i < SponserImg.length; i += itemsPerPage) {
      groupedSponsers.push(SponserImg.slice(i, i + itemsPerPage));
    }
    return groupedSponsers;
  };

  const SponserCard = ({ image }) => (
    <div className={styles.sponser_card}>
      <img src={image.image} className={styles.SponserCard_image} alt={image.title} />
    </div>
  );

  const groupedSponserCards = groupSponserCards();

  return (
    <>
      <div className={styles.sponser_title}>
        our <span className={styles.sponser_title2}>Sponsors</span>
      </div>
      <div className={styles.bottom_line}></div>
      <div className={styles.sponser_container}>
        <div className={styles.sponser_div}>
          <Carousel className={styles.customCarousel} customStyles={{ carousel_card: styles.customCarouselCard }}>
            {groupedSponserCards.map((group, index) => (
              <div key={index} className={styles.sponser_all}>
                {group.map((image, idx) => (
                  <SponserCard key={idx} image={image} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Sponser;
