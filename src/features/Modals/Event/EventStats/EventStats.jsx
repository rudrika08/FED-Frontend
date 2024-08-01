import React from "react";
import styles from "../EventModal/styles/EventModal.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormData from "../../../../data/FormData.json";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Alert, ComponentLoading } from "../../../../microInteraction";
import { X } from "lucide-react";
import Text from "../../../../components/Core/Text";
import defaultImg from "../../../../assets/images/defaultImg.jpg";
import { api } from "../../../../services";

const EventStats = ({ onClosePath }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [info, setInfo] = useState({});
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(null);
console.log("EventStats", window.location);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/form/getEvent/${eventId}`);
        if (response.status === 200) {
          setData(response.data);
          setInfo(response.data.info);
        } else {
          setAlert({
            type: "error",
            message:
              "There was an error fetching event details. Please try again.",
            position: "bottom-right",
            duration: 3000,
          });
          throw new Error(response.data.message || "Error fetching event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);

        const { events } = FormData;
        const data = events.find((event) => event._id === parseInt(eventId));
        console.log(data);
        const info = data.info;
        setData(data);
        setInfo(info);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  const handleModalClose = () => {
    navigate(onClosePath);
  };

  console.log("EventStats", info, isLoading);
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "10",
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
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
                style={{
                  overflowY: "auto",
                }}
                className={styles.card}
              >
                {isLoading ? (
                  <ComponentLoading
                    customStyles={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <button
                      className={styles.closeModal}
                      onClick={handleModalClose}
                    >
                      <X />
                    </button>
                    <div className={styles.backimg}>
                      <img
                        srcSet={info.eventImg}
                        className={styles.img}
                        alt="Event"
                      />
                    </div>
                    <div className={styles.backbtn}>
                      <div className={styles.eventname}>{info.eventTitle}</div>
                    </div>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: ".8rem",
                        fontWeight: "bold",
                        textAlign: "left",
                        marginBottom: "1rem",
                        marginLeft: "2rem",
                      }}
                    >
                      Total Registered Users :{"  "}
                      <span
                        style={{
                          color: "#FF8A00",
                        }}
                      >
                        {info.registeredUsers.length}
                      </span>
                    </Text>
                    {info.registeredUsers.length > 0 &&
                      info.registeredUsers.map((user, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: "2rem",
                            marginBottom: "1rem",
                            backgroundColor: "#2D2D2D",
                            padding: "8px 10px",
                            width: "fit-content",
                            borderRadius: "4px",
                          }}
                        >
                          <img
                            src={user.userImg || defaultImg}
                            alt="User"
                            style={{
                              borderRadius: "50%",
                              width: "32px",
                              height: "32px",
                              objectFit: "cover",
                              marginRight: "10px",
                            }}
                          />
                          <div>{user.email}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Alert />
    </div>
  );
};

export default EventStats;
