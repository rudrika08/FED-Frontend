import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import style from "./styles/Event.module.scss";
import { EventCard } from "../../components";
// import EventData from "../../data/eventData.json";
import FormData from "../../data/FormData.json"
import ring from "../../assets/images/ring.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import EventCardSkeleton from "../../layouts/Skeleton/EventCard/EventCardSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import { color } from "framer-motion";

const Event = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { events } = FormData;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulate a loading delay for demonstration purposes
        setTimeout(() => {
          const localEventData = events;
          setEventData(localEventData);
          setLoading(false);
        }, 2000); // 2 seconds delay
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const ongoingEvents = eventData.filter((event) => !event.info.isEventPast);
  const pastEvents = eventData.filter((event) => event.info.isEventPast);

  const customStyles = {
    eventname: {
      paddingTop: "5px",
      fontSize: "1.2rem",
    },
    registerbtn: {
      width: "7rem",
      fontSize: ".721rem",
    },

  };

  return (
    <div className={style.main}>
      <div style={{ display: "flex" }}>
        <div className={style.line}></div>
        <div className={style.eventwhole}>
          {loading ? (
            <SkeletonTheme color="#e0e0e0" highlightColor="#f5f5f5">
              <div className={style.eventcard}>
                <div className={style.name}>
                  <img className={style.ring1} src={ring} alt="ring" />
                  <span className={style.w1}>Ongoing</span>
                  <span className={style.w2}>Events</span>
                </div>
                <div className={style.cardsin}>
                  <EventCardSkeleton amount={2} />
                </div>
              </div>
              <div className={style.pasteventcard} style={{ marginTop: "1rem" }}>
                <div className={style.name}>
                  <img className={style.ring2} src={ring} alt="ring" />
                  <span className={style.w1}>Past</span>
                  <span className={style.w2}>Events</span>
                </div>
                <div className={style.cardone}>
                  <EventCardSkeleton amount={2} />
                </div>
              </div>
            </SkeletonTheme>
          ) : (
            <>
              {ongoingEvents.length > 0 && (
                <div className={style.eventcard}>
                  <div className={style.name}>
                    <img className={style.ring1} src={ring} alt="ring" />
                    <span className={style.w1}>Ongoing</span>
                    <span className={style.w2}>Events</span>
                  </div>
                  <div className={style.cardsin}>
                    {ongoingEvents.map((event, index) => (
                      <div style={{ height: "auto", width: "22rem" }} key={index}>
                        <EventCard
                          data={event}
                          onOpen={() => console.log("Event opened")}
                          type="ongoing"
                          customStyles={customStyles}
                          modalpath='/Events/'
                          aosDisable={false}
                  />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={style.pasteventcard} style={{ marginTop: ongoingEvents.length > 0 ? "6rem" : "1rem" }}>
                <div className={style.name}>
                  <img className={style.ring2} src={ring} alt="ring" />
                  <span className={style.w1}>Past</span>
                  <span className={style.w2}>Events</span>
                </div>
                <div className={style.cardone}>
                  {pastEvents.map((event, index) => (
                    <div style={{ height: "auto", width: "22rem" }} key={index}>
                      <EventCard
                        data={event}
                        type="past"
                        customStyles={customStyles}
                        modalpath='/Events/pastEvents/'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={style.bottom}>
        <Link to="/Events/pastEvents">
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
