import { useState } from "react";
import styles from "./styles/ViewEvent.module.scss";
import Button from "../../../../Core/Button";

import AddEventForm from "../../Form/EventForm/AddEventForm";
import eventData from "../../../../../data/eventData.json"
import PastEvents from "../../../../Event/EventCards/PastEventCard/PastEventCard";

function ViewEvent () {

  const [activepage, setactivepage] = useState("View Events");
  const pastEvents = eventData.filter(event => !event.ongoingEvent);
  return (
    <>
      <div className={styles.container}>

        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              setactivepage("View Events");
            }}
            variant={activepage === "View Events" ? "primary" : "secondary"}
          >
            View Events
          </Button>
          <Button
            variant={activepage === "Add Event" ? "primary" : "secondary"}
            onClick={() => {
              setactivepage("Add Event");
            }}
            style={{
              backgroundColor: "#44444455",
              borderColor: "#44444455",
            }}
          >
            Add Event
          </Button>
        </div>

        <form className={styles.form}>

          {activepage === "Add Event" ? (
            <AddEventForm />
          ) : (
            <div className={styles.eventList}>
                   {pastEvents.map((event, index) => (
                  <div key={index}>
                     <PastEvents 
                      data={event}
                      isPastpage={true}
                    />
                  </div>
                ))}
            </div>
          )}

        </form>

      </div>
    </>
  );
};

export default ViewEvent;
