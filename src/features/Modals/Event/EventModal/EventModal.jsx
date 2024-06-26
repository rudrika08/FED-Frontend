import React, { useState, useEffect } from "react";
import EventCardModal from "./styles/EventModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import eventData from "../../../../data/eventData.json";
import shareOutline from "../../../../assets/images/shareOutline.svg";
import Share from "../../../../components/ShareContainer/Share";
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventModal = (props) => {
    const{onClosePath}=props;
  const navigate = useNavigate();
  const { eventId } = useParams();
  const data = eventData.find((event) => event.id === eventId);
  const buttonText=data.ongoingEvent?'Register Now':'Registration closed';



  const handleModalClose = () => {

    navigate(onClosePath);
  };

  const [isOpen, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!isOpen);
  };

  const url = window.location.href;

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",

        zIndex: "10",
    
        left: "0",
        top: "0",
      }}
    >
      <div
        style={{
         position:'absolute',
         top:'0',
         left:'0',
          width: "100%",
          height: "100%",
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: "blur(4px)",
          zIndex:'5',
     
        }}
      >

        <div style={{
          zIndex:'10',
          borderRadius:'10px',
          padding:"2rem",
          position:"relative",
          display:'flex',
          justifyContent:"center",
          alignItems:"center",
          marginTop:"3rem",
        }}>

          {data && (
            <>
              <div className={EventCardModal.card}   data-aos="zoom-in-up" data-aos-duration="500">
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <button
                    className={EventCardModal.closeModal}
                    onClick={handleModalClose}
                  >
                    <X />
                  </button>
                  <div className={EventCardModal.backimg}>
                    <img
                      srcSet={data.imageURL}
                      className={EventCardModal.img}
                      alt="Event"
                    />
                    <div className={EventCardModal.date}>{data.eventDate}</div>
                    {data.ongoingEvent && <div className={EventCardModal.share} onClick={handleShare}>
                      <img
                        className={EventCardModal.shareIcon}
                        src={shareOutline}
                        alt="Share"
                      />
                    </div>
}
                  </div>
                  <div className={EventCardModal.backbtn}>
                    <div className={EventCardModal.eventname}>
                      {data.eventName}
                      <div className={EventCardModal.price}>
                        {data.eventPrice ? (
                          <p>
                            <img src={rupeeIcon} alt="Rupee" />
                            {data.eventPrice}
                          </p>
                        ) : (
                          <p style={{ color: "inherit" }}>Free</p>
                        )}
                      </div>
                      <p>
                        <img src={groupIcon} alt="Group" />
                        Team size: {data.teamSize}
                      </p>
                    </div>
                    <div className={EventCardModal.registerbtn}>
                      <button className={EventCardModal.regbtn}>
                       {buttonText}
                      </button>
                    </div>
                  </div>
                  <div className={EventCardModal.backtxt}>
                    {data.eventDetailed}
                  </div>
                </div>
              </div>
              {isOpen && <Share onClose={handleShare} urlpath={url} />}
            </>
          )}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default EventModal;
