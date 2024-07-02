import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./styles/EventCard.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Share from "../../ShareContainer/Share";
import shareOutline from "../../../assets/images/shareOutline.svg";
import groupIcon from "../../../assets/images/groups.svg";
import rupeeIcon from "../../../assets/images/rupeeIcon.svg";
import { CiLock } from "react-icons/ci";
import { PiClockCountdownDuotone } from "react-icons/pi";

const EventCard = (props) => {
  const {
    data,
    onOpen,
    type,
    modalpath,
    customStyles = {},
    showShareButton = true,
    showRegisterButton = true,
    additionalContent,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [btnTxt, setBtnTxt] = useState("Register Now");

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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

  // Toggle share modal
  const handleShare = () => {
    setOpen(!isOpen);
  };

  // Close share modal
  const handleCloseShare = () => {
    setOpen(false);
  };

  const url = window.location.href;

  return (
    <>
      <div className={style.card} style={customStyles.card} data-aos="fade-up">
        <div className={style.backimg} style={customStyles.backimg} onClick={onOpen}>
          <img srcSet={data.imageURL} className={style.img} style={customStyles.img} alt="Event" />
          <div className={style.date} style={customStyles.date}>{data.eventDate}</div>
          {type === "ongoing" && showShareButton && (
            <div className={style.share} style={customStyles.share} onClick={handleShare}>
              <img className={style.shareIcon} style={customStyles.shareIcon} src={shareOutline} alt="Share" />
            </div>
          )}
        </div>
        <div className={style.backbtn} style={customStyles.backbtn}>
          <div className={style.eventname} style={customStyles.eventname}>
            {data.eventName}
            {type === "ongoing" && (
              <p>
                <img src={groupIcon} alt="Group" />
                Team size: {data.teamSize} {" || "}
                <div className={style.price} style={customStyles.price}>
                  {data.eventPrice ? (
                    <p style={customStyles.eventnamep}>
                      <img src={rupeeIcon} alt="Rupee" />
                      {data.eventPrice}
                    </p>
                  ) : (
                    <p style={{ color: "inherit" }}>Free</p>
                  )}
                </div>
              </p>
            )}
          </div>
          {type === "ongoing" && showRegisterButton && (
            <div>
              <button
                className={style.registerbtn}
                style={{
                  ...customStyles.registerbtn,
                  cursor: btnTxt === "Register Now" ? "pointer" : "not-allowed",
                }}
                disabled={btnTxt === "Closed"}
              >
                {btnTxt === "Closed" ? (
                  <>
                    Closed <CiLock style={{ marginLeft: "5px" }} />
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
              </button>
            </div>
          )}
        </div>
        <div className={style.backtxt} style={customStyles.backtxt}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={style.EventDesc} style={customStyles.EventDesc}>{data.eventDescription}</div>
            <Link to={modalpath + data.id}>
              <span onClick={handleCloseShare} className={style.seeMore} style={{
                ...customStyles.seeMore,
                marginLeft: "auto",
                whiteSpace: "nowrap"
              }}>
                See More...
              </span>
            </Link>
          </div>
          {additionalContent && <div>{additionalContent}</div>}
        </div>
      </div>
      {isOpen && type === "ongoing" && <Share onClose={handleShare} urlpath={url + "/" + data.id} />}
    </>
  );
};

EventCard.propTypes = {
  data: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  modalpath: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  showShareButton: PropTypes.bool,
  showRegisterButton: PropTypes.bool,
  additionalContent: PropTypes.node,
};

EventCard.defaultProps = {
  customStyles: {},
  showShareButton: true,
  showRegisterButton: true,
  additionalContent: null,
};

export default EventCard;
