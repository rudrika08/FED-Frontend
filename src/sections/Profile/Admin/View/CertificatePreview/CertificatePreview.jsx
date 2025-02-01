import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components";
import { Input } from "../../../../../components";
import { api } from "../../../../../services";
import styles from "./styles/CertificatePreview.module.scss";
import { getCertificatePreview } from "../../Form/CertificatesForm/tools/certificateTools";
import { MicroLoading } from "../../../../../microInteraction";
import {accessOrCreateEventByFormId} from "../../Form/CertificatesForm/tools/certificateTools";

const CertificatesPreview = () => {
  const { eventId, eventTitle } = useParams();
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState({});
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Lorem");
  const [description, setDescription] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [certificatePreview, setCertificatePreview] = useState(
    "https://via.placeholder.com/600x300/ff6347/ffffff?text=Certificate+Preview"
  );

  useEffect(() => {
    const fetchCertificatePreview = async () => {
      setPreviewLoading(true);
      
      try {
        const preview = await getCertificatePreview(eventId);
        if (preview) {
          setCertificatePreview(preview);
          setCertificateData({ subject: "", description: "", recipientEmail: "", name: "" });
        }
      } catch (error) {
        console.error("Failed to load certificate preview:", error);
      } finally {
        setPreviewLoading(false);
      }
    };

    fetchCertificatePreview();
  }, [eventId]);

  const handleSendTestMail = async () => {
    if (!recipientEmail) {
      alert("Please enter a recipient email.");
      return;
    }

    setLoading(true);
    try {
      const eventData = await accessOrCreateEventByFormId(eventId);
      const response = await api.post("/api/certificate/testCertificateSending", {
        eventId: eventData.id,
        name,
        subject,
        email: recipientEmail,
      });

      alert(response.data.message);
    } catch (error) {
      console.error("Error sending test mail:", error);
      alert("Failed to send test mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>{eventTitle || "Event Name"} Certificate Preview</h2>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        {previewLoading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <MicroLoading />
          </div>
        ) : (
          <img
            src={certificatePreview}
            alt="Certificate Preview"
            style={{ width: "100%", height: "auto", borderRadius: 10 }}
          />
        )}

        <div style={{ width: "100%", marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Recipient Name:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", marginBottom: "20px" }}
          />

          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Subject:</label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: "100%", marginBottom: "20px" }}
          />

          <div className={styles.info} style={{ display: "flex", justifyContent: "center", width: "100%", gap: "30px" }}>
            <div>
              <label style={{ display: "block", fontWeight: "bold" }}>Description:</label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", marginBottom: "20px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "bold" }}>Recipient's Email ID:</label>
              <Input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSendTestMail} style={{ padding: "10px 20px", borderRadius: "5px", marginTop: "20px" }} disabled={loading}>
          {loading ? "Sending..." : "Send Test Mail"}
        </Button>
      </div>
    </div>
  );
};

export default CertificatesPreview;