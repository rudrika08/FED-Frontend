import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/CertificateManagement.module.scss";

const CertificateManagement = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [attendance, setAttendance] = useState({}); // Tracks checked participants

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/form/getAllForms");
        setEvents(response.data.events || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Fetch participants for a selected event
  const fetchParticipants = async (eventId) => {
    try {
      const response = await axios.get(`/api/form/getFormAnalytics/${eventId}`);
      setParticipants(response.data.regUserEmails || []);
      setAttendance({}); // Reset attendance for the new event
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  // Handle event selection
  const handleEventChange = (event) => {
    const eventId = event.target.value;
    setSelectedEvent(eventId);
    if (eventId) fetchParticipants(eventId);
  };

  // Handle attendance checkbox
  const handleAttendanceChange = (email) => {
    setAttendance((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  };

  // Send certificates
  const handleSendCertificates = async () => {
    const selectedParticipants = Object.keys(attendance).filter(
      (email) => attendance[email]
    );

    if (selectedParticipants.length === 0) {
      alert("Please select at least one participant to send certificates.");
      return;
    }

    try {
      const response = await axios.post("/api/form/sendCertificates", {
        eventId: selectedEvent,
        participants: selectedParticipants,
      });
      alert("Certificates sent successfully!");
    } catch (error) {
      console.error("Error sending certificates:", error);
      alert("Failed to send certificates. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Certificate Management</h1>

      {/* Events Dropdown */}
      <div className={styles.eventSelector}>
        <label htmlFor="event" className={styles.label}>
          Select Event:
        </label>
        <select
          id="event"
          className={styles.select}
          value={selectedEvent || ""}
          onChange={handleEventChange}
        >
          <option value="">-- Select an Event --</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Participants Section */}
      {selectedEvent && participants.length > 0 ? (
        <div className={styles.participantsSection}>
          <h2 className={styles.subHeading}>Participants</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((email) => (
                <tr key={email}>
                  <td>{email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendance[email] || false}
                      onChange={() => handleAttendanceChange(email)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={styles.sendButton}
            onClick={handleSendCertificates}
          >
            Send Certificates
          </button>
        </div>
      ) : (
        selectedEvent && (
          <p className={styles.noParticipants}>No participants found.</p>
        )
      )}
    </div>
  );
};

export default CertificateManagement;
