import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './styles/PastEventCard.module.scss'; 
import PastEventModal from '../../../../features/Modals/Event/EventModal/PastEventCardModal';

const PastEvents = ({ data,isPastpage }) => {
 const path= isPastpage ? '/pastEvents/': '/Events/pastEvents/';

 
  return (
    <>
    <div className={EventCard.card} data-aos="fade-up">
      {data && (
        <>
          <div className={EventCard.backimg} >
            <img srcSet={data.imageURL} className={EventCard.img} alt="Event" />
            <div className={EventCard.date}>{data.eventDate}</div>
          </div>
          <div className={EventCard.backtxt}>
          <div className={EventCard.eventname}>
            {data.eventName}
          </div>
            {data.eventDescription} <Link to={path+data.id}><span className={EventCard.seemore}>See More...</span></Link>
          </div>
         
        </>
      )}
    </div>
    </>
  );
};

export default PastEvents;
