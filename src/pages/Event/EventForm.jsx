import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormData from "../../data/FormData.json";
import PreviewForm from "../../features/Modals/Profile/Admin/PreviewForm";
import { api } from "../../services";
import { Alert, ComponentLoading } from "../../microInteraction";

const EventForm = () => {
  const [showPreview, setShowPreview] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
    }
  }, [alert]);

  // Ensure eventId is correctly parsed
  const id = parseInt(eventId, 10);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/api/form/getEvent/${id}`);
        if (response.status === 200) {
          setEventData(response.data);
        } else {
          setAlert({
            type: "error",
            message: "There was an error fetching event. Please try again.",
            position: "bottom-right",
            duration: 3000,
          });
          console.error("Error fetching event:", response.data.message);
        }
      } catch (error) {
        setAlert({
          type: "error",
          message: "There was an error fetching event. Please try again.",
          position: "bottom-right",
          duration: 3000,
        });
        
        console.error("Error fetching event:", error);

        console.log("Getting FallBack Event");
        const { events } = FormData;
        const localEventData = events.find((event) => event._id === id);
        setEventData(localEventData);

      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Local JSON data fallback
  // useEffect(() => {
  //   if (!eventData && !isLoading) {
  //     console.log("Getting FallBack Event");
  //     const { events } = FormData;
  //     const localEventData = events.find((event) => event._id === id);
  //     setEventData(localEventData);
  //   }
  // }, [eventData, isLoading, id]);

  return (
    <div>
      {isLoading ? (
        <ComponentLoading />
      ) : (
        showPreview && (
          <PreviewForm
            open={showPreview}
            handleClose={() => setShowPreview(false)}
            sections={eventData.sections}
            eventData={eventData.info} // Pass the correct data prop
            showCloseBtn={true}
          />
        )
      )}
      <Alert />
    </div>
  );
};

export default EventForm;
