import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './styles/Event.module.scss';
import eventData from '../../data/eventData.json';
import PastEvents from '../../components/Event/EventCards/PastEventCard/PastEventCard';
import OngoingEvent from '../../components/Event/EventCards/OngoingEventCard/OngoingEventCard';
import ring from '../../assets/images/ring.svg';

const Event = () => {
  const [activeEventId, setActiveEventId] = useState(null);

  const ongoingEvents = eventData.filter(event => event.ongoingEvent);
  const pastEvents = eventData.filter(event => !event.ongoingEvent);

  const handleModalOpen = (eventId) => {
    setActiveEventId(eventId);
  };

  const handleModalClose = () => {
    setActiveEventId(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.main}>
      <div className={style.whole}>
        <div className={style.eventwhole}>
          <img className={style.ring1} src={ring} alt="ring decoration" />
          <img className={style.ring2} src={ring} alt="ring decoration" />
          <div className={style.eventcard}>
            <div className={style.name}>
              <p>Ongoing</p>
              <h3>Events</h3>
            </div>
            <div className={style.cardsout}>
              <div className={style.cardsin}>
                {ongoingEvents.map((event, index) => (
                  <div key={index}>
                    <OngoingEvent
                      data={event}
                      isActive={activeEventId === event.id}
                      onOpen={() => handleModalOpen(event.id)}
                      onClose={handleModalClose}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.pasteventcard}>
            <div className={style.name}>
              <p>Past</p>
              <h3>Events</h3>
            </div>
            <div className={style.outcard}>
              <div className={style.cardone}>
                {pastEvents.map((event, index) => (
                  <div key={index}>
                    <PastEvents
                      data={event}
                      isActive={activeEventId === event.id}
                      onOpen={() => handleModalOpen(event.id)}
                      onClose={handleModalClose}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={style.bottom}>
          <Link to={'/pastEvents'}>
            <button className={style.seeall}>See all</button>
          </Link>
        </div>

        <div className={style.circle}></div>
        <div className={style.circleleft}></div>
        <div className={style.circleone}></div>
        <div className={style.circletwo}></div>
        <div className={style.circlethree}></div>
      </div>
    </div>
  );
};

export default Event;
