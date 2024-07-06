import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/ViewEvent.module.scss";

import {Button, EventCard} from "../../../../../components";
import FormData from "../../../../../data/FormData.json"



function ViewEvent() {
  const [activePage, setActivePage] = useState("View Events");
  const [pastEvents, setPastEvents] = useState([]);
  const{events}=FormData;
  useEffect(() => {
    // Fetch event data using axios
    const fetchEventData = async () => {
      try {
        // const response = await axios.get("/api/form/getAllForms");
        // const fetchedEvents = response.data;
        // setPastEvents(fetchedEvents);
        const testEvents=events;
        setPastEvents(testEvents);

      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);

  const customStyles = {
    eventname: {
      fontSize: "1rem",
    },
    date:{
        fontSize:"1rem",
    },
    registerbtn: {
      width: "auto",
    },
    eventnamep: {
      fontSize: "0.6rem",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => setActivePage("View Events")}
          variant={activePage === "View Events" ? "primary" : "secondary"}
        >
          View Events
        </Button>
      </div>

      <form className={styles.form}>
        {activePage === "View Events" && (
          <div className={styles.eventList}>
            {pastEvents.map((event, index) => (
              <div style={{ width: "23rem", height: "auto" }} key={index}>
                <EventCard
                  data={event}
                  customStyles={customStyles}
                  type="past"
                   modalpath='/profile/Events/'
                  isPastpage={true}
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default ViewEvent;
