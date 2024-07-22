import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import style from "./styles/EventCard.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import Share from "../../features/Modals/Event/ShareModal/ShareModal";
import shareOutline from "../../assets/images/shareOutline.svg";
import groupIcon from "../../assets/images/groups.svg";
import rupeeIcon from "../../assets/images/rupeeIcon.svg";
import ciLock from "../../assets/images/lock.svg";
import { PiClockCountdownDuotone } from "react-icons/pi";
import { IoIosLock } from "react-icons/io";
import { Button } from "../Core";
import AuthContext from "../../context/AuthContext";

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
    aosDisable,
    onEdit,
    enableEdit,
  } = props;

  const { info } = data;
  const authCtx = useContext(AuthContext);
  const [isOpen, setOpen] = useState(false);
  const [isHovered, setisHovered] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");
  const [btnTxt, setBtnTxt] = useState("Register Now");
  const navigate = useNavigate();

  useEffect(() => {
    if (aosDisable) {
      AOS.init({ disable: true });
    } else {
      AOS.init({ duration: 2000 });
    }
  }, [aosDisable]);

  useEffect(() => {
    if (info.regDateAndTime) {
      calculateRemainingTime();
      const intervalId = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [info.regDateAndTime]);

  const dateStr = info.eventDate;
  const date = new Date(dateStr);

  const day = date.getDate();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Handles 4-20
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getOrdinalSuffix(day);
  const month = date.toLocaleDateString("en-GB", { month: "long" });

  const formattedDate = `${dayWithSuffix} ${month}`;

  const calculateRemainingTime = () => {
    const regStartDate = new Date(info.regDateAndTime);
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

  useEffect(() => {
    if (info.isRegistrationClosed) {
      setBtnTxt("Closed");
    } else if (!remainingTime) {
      setBtnTxt("Register Now");
    } else {
      setBtnTxt(remainingTime);
    }
  }, [info.isRegistrationClosed, remainingTime]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const isRegistered = authCtx.user.regForm.includes(data.id);
      if (isRegistered) {
        setBtnTxt("Already Registered");
      }
    }
  }, [authCtx.isLoggedIn, authCtx.user.regForm, btnTxt, navigate, data.id]);

  const handleShare = () => {
    setOpen(!isOpen);
  };

  const handleCloseShare = () => {
    setOpen(false);
  };

  const handleForm = () => {
    if (authCtx.isLoggedIn) {
      navigate("/Events/" + data._id + "/Form");
    } else {
      sessionStorage.setItem('prevPage', window.location.pathname);
      navigate('/login');
    }
  };

  const url = window.location.href;

  return (
    <>
      <div
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
        className={style.card}
        style={customStyles.card}
        data-aos={aosDisable ? "" : "fade-up"}
      >
        <div
          className={style.backimg}
          style={customStyles.backimg}
          onClick={onOpen}
        >
          <img
            srcSet={info.eventImg}
            className={style.img}
            style={customStyles.img}
            alt="Event"
          />
          <div className={style.date} style={customStyles.date}>
            {formattedDate}
          </div>
          {type === "ongoing" && showShareButton && (
            <div
              className={style.share}
              style={customStyles.share}
              onClick={handleShare}
            >
              <img
                className={style.shareIcon}
                style={customStyles.shareIcon}
                src={shareOutline}
                alt="Share"
              />
            </div>
          )}
        </div>
        <div className={style.backbtn} style={customStyles.backbtn}>
          <div className={style.eventname} style={customStyles.eventname}>
            {info.eventTitle}
            {type === "ongoing" && (
              <p>
                <img src={groupIcon} alt="Group" />
                <span style={{ color: "white", paddingRight: "5px" }}>
                  Team size:
                </span>{" "}
                {info.minTeamSize}
                {"-"}
                {info.maxTeamSize} {" | "}
                <div className={style.price} style={customStyles.price}>
                  {info.eventAmount ? (
                    <p style={customStyles.eventnamep}>
                      <img src={rupeeIcon} alt="Rupee" />
                      {info.eventAmount}
                    </p>
                  ) : (
                    <p style={{ color: "inherit" }}>Free</p>
                  )}
                </div>
              </p>
            )}
          </div>
          {type === "ongoing" && showRegisterButton && (
            <div style={{ fontSize: ".85rem", color: "white" }}>
              <button
                className={style.registerbtn}
                style={{
                  ...customStyles.registerbtn,
                  cursor: btnTxt === "Register Now" ? "pointer" : "not-allowed",
                }}
                onClick={handleForm}
                disabled={btnTxt === "Closed" || btnTxt === "Already Registered"}
              >
                {btnTxt === "Closed" ? (
                  <>
                    <div style={{ fontSize: "0.85rem" }}>Closed</div>{" "}
                    <IoIosLock
                      alt=""
                      style={{ marginLeft: "0px", fontSize: "1rem" }}
                    />
                  </>
                ) : btnTxt === "Already Registered" ? (
                  <>
                    <div style={{ fontSize: "0.85rem" }}>
                      Registered
                    </div>{" "}
                  </>
                ) : (
                  <>
                    {remainingTime ? (
                      <>
                        <PiClockCountdownDuotone /> {btnTxt}
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        <div className={style.backtxt} style={customStyles.backtxt}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={style.EventDesc} style={customStyles.EventDesc}>
              {info.eventdescription}
            </div>
            <Link to={modalpath + data._id}>
              <span
                onClick={handleCloseShare}
                className={style.seeMore}
                style={{
                  ...customStyles.seeMore,
                  marginLeft: "auto",
                  whiteSpace: "nowrap",
                  height: "fit-content",
                }}
              >
                See More
              </span>
            </Link>
          </div>
          {additionalContent && <div>{additionalContent}</div>}
        </div>
      </div>
      {isOpen && type === "ongoing" && (
        <Share onClose={handleShare} urlpath={url + "/" + data._id} />
      )}
      {enableEdit && isHovered && authCtx.user.access==="ADMIN" && (
        <div
          onMouseEnter={() => setisHovered(true)}
          onMouseLeave={() => setisHovered(false)}
          className={style.hovered}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (onEdit) {
                authCtx.eventData = data;
                onEdit();
              }
            }}
            variant="secondary"
          >
            Edit Event
          </Button>
          <Button variant="secondary">Delete Event</Button>
        </div>
      )}
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
  aosDisable: PropTypes.bool,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
};

export default EventCard;
