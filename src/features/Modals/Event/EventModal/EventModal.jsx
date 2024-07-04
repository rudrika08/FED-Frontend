import React, { useState, useEffect } from "react";
import EventCardModal from "./styles/EventModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import eventData from "../../../../data/eventData.json";
import shareOutline from "../../../../assets/images/shareOutline.svg";
import Share from "../ShareModal/ShareModal";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CiLock } from "react-icons/ci";
import { PiClockCountdownDuotone } from "react-icons/pi";

const EventModal = (props) => {
    const{onClosePath}=props;
  const navigate = useNavigate();
  const { eventId } = useParams();
  const data = eventData.find((event) => event.id === eventId);
  // const buttonText=data.ongoingEvent?'Register Now':'Registration closed';


  const [remainingTime, setRemainingTime] = useState("");
  const [btnTxt, setBtnTxt] = useState("Register Now");

   // Calculate remaining time until registration starts
   useEffect(() => {
    if (data.regDateAndTime) {
      calculateRemainingTime(); // Initial calculation
      const intervalId = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [data.regDateAndTime]);

  // Function to calculate remaining time until registration starts
  const calculateRemainingTime = () => {
    const regStartDate = new Date(data.regDateAndTime);
    const now = new Date();
    const timeDifference = regStartDate - now;

    if (timeDifference <= 0) {
      setRemainingTime(null);
      return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    const remaining = [
      days > 0 ? `${days}d ` : "",
      hours > 0 ? `${hours}h ` : "",
      minutes > 0 ? `${minutes}m ` : "",
      seconds > 0 ? `${seconds}s` : "",
    ].join("");

    setRemainingTime(remaining.trim());
  };

  // Update button text based on registration status and remaining time
  useEffect(() => {
    if (!remainingTime) {
      if (data.registrationClosed) {
        setBtnTxt("Closed");
      } else {
        setBtnTxt("Register Now");
      }
    } else {
      setBtnTxt(remainingTime);
    }
  }, [data.registrationClosed, remainingTime]);


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
          marginTop:".3rem",
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
                       {
                        data.ongoingEvent ?(<>
                                 {btnTxt === "Closed" ? (
                  <>
                   Registration Closed <CiLock style={{ marginLeft: "" }} />
                  </>
                ) : (
                  <>
                    {remainingTime ? (
                      <>
                        <PiClockCountdownDuotone /> {btnTxt}
                      </>
                    ) : (
                      btnTxt
                    )}
                  </>
                )}
                        </>):(
                              <>
                              Registration Closed <CiLock style={{ marginLeft: "" }} />
                             </>
                        )
                       }
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
