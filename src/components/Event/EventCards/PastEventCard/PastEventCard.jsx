import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./styles/PastEventCard.module.scss";

const PastEvents = ({ data, isPastpage }) => {
  const path = isPastpage ? "/pastEvents/" : "/Events/pastEvents/";

  return (
    <>
      <div className={EventCard.card} data-aos="fade-up">
        {data && (
          <>
            <div className={EventCard.backimg}>
              <img
                srcSet={data.imageURL}
                className={EventCard.img}
                alt="Event"
              />
              <div className={EventCard.date}>{data.eventDate}</div>
            </div>
            <div className={EventCard.backtxt}>
              <div className={EventCard.eventname}>{data.eventName}</div>
              <span className={EventCard.eventdesc}>
                {" "}
                {data.eventDescription}{" "}
              </span>
              <Link to={path + data.id}>
                <span className={EventCard.seeMore}>See More...</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PastEvents;
