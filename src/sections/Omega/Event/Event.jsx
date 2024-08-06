import React from 'react';
import styles from './styles/Event.module.scss';
import data from '../../../data/omega/Event.json';

function OmegaEventCard({ title, desc }) {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.cut}`}></div>
      <div className={`${styles.card_img}`}>
        <img src="https://png.pngtree.com/thumb_back/fh260/background/20230530/pngtree-thai-bangkaew-dog-doggy-puppy-photo-image_2798211.jpg" alt="Event Image" />
      </div>
      <div className={`${styles.card_content}`}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <button>Register Now</button>
        <div className={`${styles.cut2}`}></div>
      </div>
    </div>
  );
}

function Event() {
  return (
    <>
      <div className={`${styles.eventBox}`}>
        <div className={`${styles.eventHeading}`}>
          <h1>YOUR NEXT BIG IDEA DESERVES A <br /> GRAND STAGE!</h1>
        </div>
        <div className={`${styles.eventCards}`}>
          <div className={`${styles.cardItem}`}>
            {data.map((item, index) => (
              <OmegaEventCard key={index} title={item.title} desc={item.desc} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
