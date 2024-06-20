import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import eventData from "../../../../data/eventData.json";
import EventCardModal2 from "./styles/PastEventCardModal.module.scss";
import groupIcon from "../../../../assets/images/groups.svg";
import rupeeIcon from "../../../../assets/images/rupeeIcon.svg";

const PastEventModal = ({ onClose, isPastPage }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const scrollPostion = isPastPage ? 20 : 700;
  const data = eventData.find((event) => event.id === eventId);
  const pastPath = isPastPage ? "/Events/pastEvents" : "/Events";
  useEffect(() => {
    window.scrollTo(0, scrollPostion);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleModalClose = () => {
    document.body.style.overflow = "unset";
    navigate(pastPath);
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "auto",
        display: "flex",
        zIndex: "15",
        justifyContent: "center",
        alignItems: "center",
        left: "0",
        top: "0",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100rem",
          position: "relative",

          top: isPastPage ? "0%" : "95%",
        }}
      >
        <div className={EventCardModal2.modalOverlay}>
          {data && (
            <div
              className={EventCardModal2.card}
              style={{ top: isPastPage ? "2.5rem" : "45rem" }}
            >
              <div style={{ position: "relative" }}>
                <button
                  className={EventCardModal2.closeModal}
                  onClick={handleModalClose}
                >
                  <X />
                </button>
                <div className={EventCardModal2.backimg}>
                  <img
                    srcSet={data.imageURL}
                    className={EventCardModal2.img}
                    alt={data.eventName}
                  />
                  <div className={EventCardModal2.date}>{data.eventDate}</div>
                </div>
                <div className={EventCardModal2.backbtn}>
                  <div className={EventCardModal2.eventname}>
                    {data.eventName}
                    <div className={EventCardModal2.price}>
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
                  <div className={EventCardModal2.registerbtn}>
                    <button disabled className={EventCardModal2.regbtn}>
                      Registration Closed
                    </button>
                  </div>
                </div>
                <div className={EventCardModal2.backtxt}>
                  {data.eventDetailed}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastEventModal;
