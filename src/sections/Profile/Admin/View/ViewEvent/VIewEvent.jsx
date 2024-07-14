import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/ViewEvent.module.scss";
import AOS from "aos";
import 'aos/dist/aos.css';
import {Button, EventCard} from "../../../../../components";
import FormData from "../../../../../data/FormData.json"


// AOS.init({
//   disable:true
// })
function ViewEvent() {
  const [activePage, setActivePage] = useState("View Events");
  const [pastEvents, setPastEvents] = useState([]);
  const[ongoingEvent,setOngoingEvent]=useState([]);
  const{events}=FormData;
  useEffect(() => {
    // Fetch event data using axios
    const fetchEventData = async () => {
      try {
        // const response = await axios.get("/api/form/getAllForms");
        // const fetchedEvents = response.data;
        // setPastEvents(fetchedEvents);
        const ongoingEvents=events.filter((event)=>!event.info.isEventPast)
        const pastEvent=events.filter((event)=>event.info.isEventPast)
        setOngoingEvent(ongoingEvents);
        setPastEvents(pastEvent);
        console.log(ongoingEvent);
        console.log(pastEvents)

      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, []);

   // Initialize AOS
   useEffect(() => {
    AOS.init();
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
        <h3 className={styles.headInnerText}>
          <span>View</span> Event
        </h3>
      </div>

      <form className={styles.form}>
        {activePage === "View Events" && (
          <div className={styles.eventList}>
            {ongoingEvent.map((event, index) => (
              <div style={{ width: "23rem", height: "auto" }} key={index}>
                <EventCard
                  data={event}
                  customStyles={customStyles}
                  type="ongoing"
                   modalpath='/profile/Events/'
                  isPastpage={true}
                />
              </div>
            ))}
            {pastEvents.map((event, index) => (
              <div style={{ width: "23rem", height: "auto" }} key={index}>
                <EventCard
                  data={event}
                  customStyles={customStyles}
                  type="past"
                   modalpath='/profile/Events/'
                  isPastpage={true}
                  aosDisable={true}
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
