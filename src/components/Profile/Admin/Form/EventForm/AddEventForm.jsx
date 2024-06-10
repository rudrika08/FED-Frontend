import  { useState } from "react";
import styles from "./styles/AddEventForm.module.scss";
import Button from "../../../../Core/Button";
import Input from "../../../../Core/Input";

function AddEventForm () {

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [posterLink, setPosterLink] = useState("");

  const handleEventNameChange = (e) => setEventName(e.target.value);

  const handleEventDescriptionChange = (e) =>
    setEventDescription(e.target.value);

  const handleRegistrationTypeChange = (e) =>
    setRegistrationType(e.target.value);

  const handlePosterLinkChange = (e) => setPosterLink(e.target.value);

  // const [activepage, setactivepage] = useState("View Events");
   // {activepage === "Add Event" ? (
        //   <div className={styles.posterPreview}>
        //     <p>Poster Preview</p>
        //     {posterLink && <img src={posterLink} alt="Poster Preview" />}
        //   </div>
        // ) : null}

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.topSection}>
              <div className={styles.topSectionInputContainer}>
                <Input
                  type="text"
                  value={eventName}
                  onChange={handleEventNameChange}
                  placeholder="Enter Event Name"
                  label="Event Name"
                  className={styles.EventInput}
                />
                <Input
                  type="text"
                  value={posterLink}
                  onChange={handlePosterLinkChange}
                  placeholder="Poster Link"
                  label="Event Poster"
                  className={styles.EventInput}
                />
                <Input
                  type="select"
                  value={registrationType}
                  onChange={handleRegistrationTypeChange}
                  className={styles.EventInput}
                  options={[
                    { label: "Free", value: "free" },
                    { label: "Paid", value: "paid" },
                  ]}
                  placeholder="Select Type"
                  label="Registration Type"
                />
              </div>
              <div className={styles.topSectionInputContainer}>
                <Input
                  type="textArea"
                  value={eventDescription}
                  onChange={handleEventDescriptionChange}
                  placeholder="Enter Event Description"
                  label="Event Description"
                  className={styles.EventInputArea}
                />
              </div>
            </div>
            <div className={styles.posterPreview}>
              <p>Poster Preview</p>
              {posterLink && <img src={posterLink} alt="Poster Preview" />}
            </div>
        </form>

       
      </div>
    </>
  );
}

export default AddEventForm;











