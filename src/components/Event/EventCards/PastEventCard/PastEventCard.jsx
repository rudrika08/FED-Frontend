import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./styles/PastEventCard.module.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const PastEvents = ({ data, isPastpage }) => {
  const path = isPastpage ? "/pastEvents/" : "/Events/pastEvents/";

  const boxVariant = {
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
    hidden: { opacity: 0, y: 100 }
  };

  const AnimatedBox = ({ children }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.3
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        variants={boxVariant}
        initial="hidden"
        animate={controls}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <AnimatedBox>
      <div className={EventCard.card}>
        {data && (
          <>
            <div className={EventCard.backimg}>
              <img srcSet={data.imageURL} className={EventCard.img} alt="Event" />
              <div className={EventCard.date}>{data.eventDate}</div>
            </div>
            <div className={EventCard.backtxt}>
              <div className={EventCard.eventname}>{data.eventName}</div>
              <span className={EventCard.eventdesc}>{data.eventDescription}</span>
              <Link to={path + data.id}>
                <span className={EventCard.seeMore}>See More...</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </AnimatedBox>
  );
};

export default PastEvents;
