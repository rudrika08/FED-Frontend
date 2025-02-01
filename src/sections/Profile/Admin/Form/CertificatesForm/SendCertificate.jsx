import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "../../../../../components";
import { api } from "../../../../../services";
import { getCertificatePreview, sendBatchMail } from "./tools/certificateTools";
import { object } from "prop-types";

const Checkbox = ({ id, checked, onCheckedChange }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      style={{ width: 18, height: 18, accentColor: "#007bff" }}
    />
  );
};

// const getCertificatePreview = async (formId) => {
//     try {
//         const event = await accessOrCreateEventByFormId(formId);
//         console.log(event);
//         const certificate = event.certificates[0].template;
//         const fields = event.certificates[0].fields;

//         const cert = await api.post("/api/certificate/dummyCertificate", {
//             imageLink: certificate,
//             fields,
//         });

//         console.log(cert.data.imageSrc);
//         return cert.data.imageSrc;
//     } catch (error) {
//         console.error("Error fetching certificate preview:", error);
//     }
// };

const SendCertificate = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [checkedAttendees, setCheckedAttendees] = useState([]);
  const [subject, setSubject] = useState("Certificate of Appreciation");
  const [description, setDescription] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [mailFrequency, setMailFrequency] = useState(20);
  const [uncheckedFilterText, setUncheckedFilterText] = useState("");
  const [checkedFilterText, setCheckedFilterText] = useState("");
  const [certificatePreview, setCertificatePreview] = useState(
    "https://via.placeholder.com/600x300/ff6347/ffffff?text=Certificate+Preview"
  );

  useEffect(() => {
    const fetchCertificatePreview = async () => {
      const preview = await getCertificatePreview(eventId);
      if (preview) {
        setCertificatePreview(preview);
      }
    };

    fetchCertificatePreview();
  }, [eventId]);

  useEffect(() => {
    const fetchAttendees = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/api/form/getFormAnalytics/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const fetchedAttendees =
            response.data.form?.formAnalytics[0]?.regUserEmails || [];
          setAttendees(fetchedAttendees);
        } else {
          console.error("Error fetching attendees:", response.data);
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [eventId]);

  const handleCheckAttendee = (email) => {
    setCheckedAttendees((prev) => [...prev, email]);
  };

  const handleUncheckAttendee = (email) => {
    setCheckedAttendees((prev) => prev.filter((a) => a !== email));
  };

  const handleSelectAllUnchecked = () => {
    setCheckedAttendees([...attendees]);
  };

  const handleDeselectAllUnchecked = () => {
    setCheckedAttendees([]);
  };

  useEffect(() => {
    setRecipientEmail(checkedAttendees.join(", "));
  }, [checkedAttendees]);

  const filteredAttendees = attendees.filter((email) =>
    email.toLowerCase().includes(uncheckedFilterText.toLowerCase())
  );

  const filteredCheckedAttendees = checkedAttendees.filter((email) =>
    email.toLowerCase().includes(checkedFilterText.toLowerCase())
  );

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSendBatchMail = async () => {
    try {
      const response = await sendBatchMail({
        batchSize: mailFrequency,
        formId: eventId,
        subject: subject,
        htmlContent: description,
      });

      setSuccessMessage("Batch mail sent successfully!");
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Error sending batch mail: " + error.message);
      setSuccessMessage(null);
    }
  };
  return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              flex: 1,
              padding: 20,
              border: "1px solid #ccc",
              borderRadius: 10,
              height: 300,
              objectFit: "cover",
            }}
          >
            <img
              src={certificatePreview}
              alt="Certificate Preview"
              style={{ width: "100%", height: "auto", borderRadius: 10 }}
            />
          </div>
          <div
            style={{
              flex: 1,
              padding: 20,
              border: "1px solid #ccc",
              borderRadius: 10,
              height: 300,
            }}
          >
            <h3 style={{marginLeft: "5px"}}>Unchecked Attendees</h3>
            <Input
              type="text"
              placeholder="Filter Unchecked"
              value={uncheckedFilterText}
              onChange={(e) => setUncheckedFilterText(e.target.value)}
              style={{ width: "100%", marginTop: "-10px" }}
            />
            <div style={{ display: "flex", gap: 10, marginTop: -10,marginLeft: "5px" }}>
              <Button onClick={handleSelectAllUnchecked}>Select All</Button>
              <Button onClick={handleDeselectAllUnchecked}>Deselect All</Button>
            </div>
            <div
              style={{
                maxHeight: "100px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "10px",
                marginLeft: "8px",
              }}
            >
              {loading ? (
                <p>Loading attendees...</p>
              ) : filteredAttendees.length > 0 ? (
                filteredAttendees.map((email) => (
                  <div
                    key={email}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Checkbox
                      checked={checkedAttendees.includes(email)}
                      onCheckedChange={() =>
                        checkedAttendees.includes(email)
                          ? handleUncheckAttendee(email)
                          : handleCheckAttendee(email)
                      }
                    />
                    <label>{email}</label>
                  </div>
                ))
              ) : (
                <p>No unchecked attendees.</p>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 10,
            maxHeight: "330px",
            overflowY: "auto",
            width: "50%",
          }}
        >
          <h3 style={{marginLeft: "5px"}}>Checked Attendees</h3>
          <Input
            type="text"
            placeholder="Filter Checked"
            value={checkedFilterText}
            onChange={(e) => setCheckedFilterText(e.target.value)}
            style={{ width: "100%", marginTop: "-10px" }}
          />
          <div
            style={{
              maxHeight: "150px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginTop: "10px",
              marginLeft: "8px" ,
              width: "100%",
              padding: "10px",
            
            }}
          >
            {checkedAttendees.length > 0 ? (
              filteredCheckedAttendees.map((email) => (
                <p key={email}>{email}</p>
              ))
            ) : (
              <p>No checked attendees.</p>
            )}
          </div>

          <h3 style={{marginLeft: "5px",marginTop: "10px"}}>Recipient Email</h3>
          <Input
            type="email"
            placeholder="Emails will be added here"
            value={recipientEmail}
            readOnly
            style={{ width: "100%" }}
          />

          <h3 style={{marginLeft: "5px"}}>Subject</h3>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: "100%" }}
          />

                    <h3 style={{marginLeft: "5px"}}>Description</h3>
                    <Input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            width: "100%",
                            height: 80,
                            marginTop: -10,
                        }}
                    />

                    <h3 style={{marginLeft: "5px"}}>Mail Frequency</h3>
                    <Input
                        type="number"
                        placeholder="Set mail frequency"
                        value={mailFrequency}
                        onChange={(e) => setMailFrequency(e.target.value)}
                        style={{ marginTop: -10, width: "100%" }}
                    />
                    <div style={{ display: "flex", gap: 10, marginTop: -10,marginLeft: "5px" }}>
                    <Button onClick={() => console.log("Sending mail...")}>Test Mail</Button>
                    <Button onClick={() => console.log("Sending mail...")}>Send Mail</Button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SendCertificate;
