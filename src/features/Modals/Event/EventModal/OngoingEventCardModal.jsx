/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import EventCardModal from "./styles/OngoingEventCardModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import eventData from "../../../../data/eventData.json";
import shareOutline from "../../../../assets/images/shareOutline.svg";
import Share from "../../../../components/Event/ShareContainer/Share";

const OngoingEventModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const data = eventData.find((event) => event.id === eventId);

  useEffect(() => {
    window.scrollTo(0, 24);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    navigate("/Events");
  };

  const [isOpen, setOpen] = useState(false);

  const handleShare = () => {
    setOpen(!isOpen);
  };

  const url = window.location.href;

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100rem",
        display: "flex",
        justifyContent: "center",
        zIndex: "10",
        alignItems: "center",
        left: "0",
        top: "0",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className={EventCardModal.modalOverlay}>
          {data && (
            <>
              <div className={EventCardModal.card}>
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
                    <div className={EventCardModal.share} onClick={handleShare}>
                      <img
                        className={EventCardModal.shareIcon}
                        src={shareOutline}
                        alt="Share"
                      />
                    </div>
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
                        Register Now
                      </button>
                    </div>
                  </div>
                  <div className={EventCardModal.backtxt}>
                    {data.eventDetailed}
                  </div>
                </div>
              </div>
              {isOpen && <Share onClose={handleShare} urlpath={url}/>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OngoingEventModal;
