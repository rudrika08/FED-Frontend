import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormData from '../../data/FormData.json';
import PreviewForm from '../../features/Modals/Profile/Admin/PreviewForm';

const EventForm = () => {
  const [showPreview, setShowPreview] = useState(true);
  const { eventId } = useParams();
  
  // Ensure eventId is correctly parsed
  const id = parseInt(eventId, 10);
  
  // Find the event based on eventId
  const { events } = FormData;
  const eventData = events.find((event) => event._id === id);
  
  // If data is not found, you might want to handle this case
  if (!eventData) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      {showPreview && (
        <PreviewForm
          open={showPreview}
          handleClose={() => setShowPreview(false)}
          sections={eventData.sections}
          eventData={eventData.info} // Pass the correct data prop
          showCloseBtn={true}
        />
      )}
    </div>
  );
}

export default EventForm;
