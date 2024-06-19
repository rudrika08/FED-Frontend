import React, { useState, useEffect } from 'react';
import EventCard from './styles/OngoingEventCard.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import shareOutline from "../../../../assets/images/shareOutline.svg";
import groupIcon from '../../../../assets/images/groups.svg';
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { Link } from 'react-router-dom';
import Share from '../../ShareContainer/Share';

const OngoingEvent = ({ data, isActive, onOpen, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  if (!data) return null;

  const [isOpen, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!isOpen);
  }

  const handlesharebtn=()=>{
    setOpen(false)
  }

  const url = window.location.href;

  return (
    <>
      <div className={EventCard.card} data-aos="fade-up">
        <div className={EventCard.backimg} onClick={onOpen}>
          <img srcSet={data.imageURL} className={EventCard.img} alt="Event" />
          <div className={EventCard.date}>{data.eventDate}</div>
          <div className={EventCard.share} onClick={handleShare}>
            <img className={EventCard.shareIcon} src={shareOutline} alt="Share" />
          </div>
        </div>
        <div className={EventCard.backbtn}>
          <div className={EventCard.eventname}>
            {data.eventName}
            <div className={EventCard.price}>
              {data.eventPrice ? (
                <p><img src={rupeeIcon} alt="Rupee" />{data.eventPrice}</p>
              ) : (
                <p style={{ color: 'inherit' }}>Free</p>
              )}
            </div>
            <p><img src={groupIcon} alt="Group" />Team size: {data.teamSize}</p>
          </div>
          <div className={EventCard.registerbtn}>
            <button className={EventCard.regbtn}>Register Now</button>
          </div>
        </div>
        <div className={EventCard.backtxt}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={EventCard.EventDesc}>{data.eventDescription}</div>
            <Link to={"/Events/" + data.id}> <span onClick={handlesharebtn} className={EventCard.seeMore} style={{ marginLeft: 'auto', whiteSpace: "nowrap" }}>
              See More...
            </span></Link>
          </div>
        </div>
      </div>
      {isOpen && <Share onClose={handleShare} urlpath={url+'/'+data.id} />}
    </>
  );
};

export default OngoingEvent;
