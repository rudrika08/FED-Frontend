import React, { useState, useEffect, useContext } from "react";
import EventCardModal from "./styles/EventModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
// import eventData from "../../../../data/eventData.json";
import FormData from "../../../../data/FormData.json";
import shareOutline from "../../../../assets/images/shareOutline.svg";
import Share from "../../../../features/Modals/Event/ShareModal/ShareModal";
import AOS from "aos";
import "aos/dist/aos.css";
import { CiLock } from "react-icons/ci";
import { PiClockCountdownDuotone } from "react-icons/pi";
import AuthContext from "../../../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { IoIosLock } from "react-icons/io";

const EventModal = (props) => {
  const { onClosePath } = props;
  const navigate = useNavigate();
  const { eventId } = useParams();
  // console.log(eventId);
  // console.log(FormData);
  const { events } = FormData;
  // console.log(events);
  const data = events.find((event) => event.id === parseInt(eventId));
  console.log(data);

  // const buttonText=data.ongoingEvent?'Register Now':'Registration closed';
  const { info } = data;

  const [remainingTime, setRemainingTime] = useState("");
  const [btnTxt, setBtnTxt] = useState("Register Now");
  const authCtx = useContext(AuthContext);

  // console.log(info)

  useEffect(() => {
    if (info.regDateAndTime) {
      calculateRemainingTime();
      const intervalId = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(intervalId);
    }
  }, [info.regDateAndTime]);

  //Calculating data of event
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

  // Update button text based on registration status and remaining time
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


  const handleModalClose = () => {
    navigate(onClosePath);
  };

  const [isOpen, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!isOpen);
  };

  const handleForm = () => {
    if (authCtx.isLoggedIn) {
      navigate("/Events/" + data.id + "/Form");
    } else {
      sessionStorage.setItem('prevPage', window.location.pathname);
      navigate('/login');
    }
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
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: "5",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            zIndex: "10",
            borderRadius: "10px",
            padding: "2rem",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: ".3rem",
          }}
        >
          {data && (
            <>
              <SkeletonTheme baseColor="#313131" highlightColor="#525252">
                <Skeleton height={180} style={{ marginBottom: "1rem" }} />
                <Skeleton
                  count={3}
                  height={20}
                  width="100%"
                  style={{ marginBottom: "0.5rem" }}
                />
              </SkeletonTheme>
              <div
                className={EventCardModal.card}
                data-aos="zoom-in-up"
                data-aos-duration="500"
              >
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
                      srcSet={info.eventImg}
                      className={EventCardModal.img}
                      alt="Event"
                    />
                    <div className={EventCardModal.date}>{formattedDate}</div>
                    {info.ongoingEvent && (
                      <div
                        className={EventCardModal.share}
                        onClick={handleShare}
                      >
                        <img
                          className={EventCardModal.shareIcon}
                          src={shareOutline}
                          alt="Share"
                        />
                      </div>
                    )}
                  </div>
                  <div className={EventCardModal.backbtn}>
                    <div className={EventCardModal.eventname}>
                      {info.eventTitle}
                      <div className={EventCardModal.price}>
                        {info.eventAmount ? (
                          <p>
                            <img src={rupeeIcon} alt="Rupee" />
                            {info.eventAmount}
                          </p>
                        ) : (
                          <p style={{ color: "inherit" }}>Free</p>
                        )}
                      </div>
                      <p>
                        <img src={groupIcon} alt="Group" />
                        Team size: {info.minTeamSize}
                        {" - "}
                        {info.maxTeamSize}
                      </p>
                    </div>
                    <div className={EventCardModal.registerbtn}>
                      <button
                        className={EventCardModal.registerbtn}
                        style={{
                          cursor:
                            btnTxt === "Register Now"
                              ? "pointer"
                              : "not-allowed",
                        }}
                        onClick={handleForm}
                        disabled={
                          btnTxt === "Closed" || btnTxt === "Already Registered"
                        }
                      >
                        {btnTxt === "Closed" ? (
                          <>
                            <div style={{ fontSize: "0.85rem" }}>Registration Closed</div>{" "}
                            <IoIosLock
                              alt=""
                              style={{ marginLeft: "0px", fontSize: "1.2rem" }}
                            />
                          </>
                        ) : btnTxt === "Already Registered" ? (
                          <>
                            <div style={{ fontSize: "0.85rem" }}>
                              Already Registered
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
                  </div>
                  <div className={EventCardModal.backtxt}>
                    {info.eventdescription}
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
