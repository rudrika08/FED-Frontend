import React, { useEffect, useState } from 'react';
import sponsorsData from '../../../data/omega/Sponsor.json';
import styles from './styles/Sponsors.module.scss';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    setSponsors(sponsorsData);
  }, []);

  return (
    <div className={styles.sponsorsSection}>
      <h1>OUR &nbsp;</h1>
      <h1 className={styles.heading}>SPONSOR</h1>
      <div className={styles.sponsorsLogos}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className={styles.sponsor}>
            <img src={sponsor.logo} alt={sponsor.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
