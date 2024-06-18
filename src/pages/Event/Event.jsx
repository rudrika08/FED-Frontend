import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./styles/Event.module.scss";
import eventData from "../../data/eventData.json";
import PastEvents from "../../components/Event/EventCards/PastEventCard/PastEventCard";
import OngoingEvent from "../../components/Event/EventCards/OngoingEventCard/OngoingEventCard";
import ring from "../../assets/images/ring.svg";
import { MdKeyboardArrowRight } from "react-icons/md";


const Event = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const [activeEventId, setActiveEventId] = useState(null);

  const ongoingEvents = eventData.filter((event) => event.ongoingEvent);
  const pastEvents = eventData.filter((event) => !event.ongoingEvent);

  // const handleModalOpen = (eventId) => {
  //   setActiveEventId(eventId);
  //   document.body.style.overflow = 'hidden';

  // };

  // const handleModalClose = () => {
  //   setActiveEventId(null);
  //   document.body.style.overflow = 'unset';
  //   // document.body.style.backdropFilter='unset'
  // };



  return (
    <div className={style.main}>
      <div style={{ display: "flex" }}>
        <div className={style.line}></div>
        <div className={style.eventwhole}>
          <div className={style.eventcard}>
            <div className={style.name}>
              <img className={style.ring1} src={ring}></img>
              <span>Ongoing</span>
              <h3>Events</h3>
            </div>
            {/* <div className={style.cardsout}> */}
            <div className={style.cardsin}>
             
              {ongoingEvents.map((event, index) => (
                <div key={index}>
                  <OngoingEvent data={event} />
                </div>
              ))}
            </div>
            {/* </div>  */}
          </div>

          <div className={style.pasteventcard}>
            <div className={style.name}>
              <img className={style.ring2} src={ring}></img>
              <span>Past</span>
              <h3>Events</h3>
            </div>
            <div className={style.outcard}>
              <div className={style.cardone}>
                {pastEvents.map((event, index) => (
                  <div key={index}>
                    <PastEvents data={event} isPastpage={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.bottom}>
        <Link to={"/Events/pastEvents"}>
          <button className={style.seeall}>
            See all <MdKeyboardArrowRight />
          </button>
        </Link>
      </div>

      <div className={style.circle}></div>
      <div className={style.circleleft}></div>
      <div className={style.circleone}></div>
      <div className={style.circletwo}></div>
      <div className={style.circlethree}></div>
    </div>
  );
};

export default Event;
