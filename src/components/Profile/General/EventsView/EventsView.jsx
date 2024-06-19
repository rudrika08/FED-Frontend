import React, { useContext } from "react";
import styles from "./styles/EventsView.module.scss";
import AuthContext from "../../../../store/AuthContext";
import eventsData from "../../../../data/eventData.json";

const Events = () => {
  const authCtx = useContext(AuthContext);

  const userEvents = eventsData.filter((event) =>
    event.registeredUsers && event.registeredUsers.includes(authCtx.user.email)
  );

  return (
    <div className={styles.participatedEvents}>
      <div className={styles.proHeading}>
        <h3 className={styles.headInnerText}>
          <span>Participated</span> Events
        </h3>
      </div>

      <div className={styles.tables}>
        {userEvents.length > 0 ? (
          <table className={styles.eventsTable}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Date</th>
                {/* Add more headers*/}
              </tr>
            </thead>
            <tbody>
              {userEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  {/* Add more table cells*/}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noEvents}>Not participated in any Events</p>
        )}
      </div>
    </div>
  );
};

export default Events;
