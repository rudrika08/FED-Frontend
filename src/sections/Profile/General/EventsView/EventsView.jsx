import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/EventsView.module.scss";
import AuthContext from "../../../../context/AuthContext";
import eventsData from "../../../../data/FormData.json";
import { EventModal } from "../../../../features/Modals";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const authCtx = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // const response = await axios.get("/api/form/getAllForms");
        // const fetchedEvents = response.data;

        // Simulate fetched events with local data
        const userEvents = authCtx.user.regForm;
        console.log(userEvents);

        // Ensure `eventsData` is an array of event objects
        const events = eventsData.events;

        // Filter events based on user participation
        const filteredEvents = events.filter((event) =>
          userEvents.includes(event.id)
        );
        console.log(filteredEvents);
        setUserEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventsData();
  }, [authCtx.user.email]);

  const handleView = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
    navigate(`/profile/Events/${eventId}`);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

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
                <th className={styles.mobilewidth}>View</th>
                {/* Add more headers */}
              </tr>
            </thead>

            <tbody>
              {userEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.info.eventTitle}</td>
                  <td>{formatDate(event.info.eventDate)}</td>
                  <td className={styles.mobilewidthtd}>
                    <button
                      onClick={() => handleView(event.id)}
                      className={styles.viewButton}
                    >
                      View
                    </button>
                  </td>
                  {/* Add more table cells */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noEvents}>Not participated in any Events</p>
        )}
      </div>
      {isModalOpen && selectedEventId && (
        <EventModal
          eventId={selectedEventId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>

    
  );
};

export default Events;
