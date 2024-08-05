import React, { useEffect, useState } from 'react';
import sponsorsData from '../../../data/omega/Sponsor.json'; 
import './styles/Sponsors.module.scss';

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    setSponsors(sponsorsData);
  }, []);

  return (
    <div className="sponsors-section">
      <h2>Our &nbsp;</h2>
      <h2 className='heading'>Sponsors</h2>
      <div className="sponsors-logos">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="sponsor">
            <img src={sponsor.logo} alt={sponsor.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;

