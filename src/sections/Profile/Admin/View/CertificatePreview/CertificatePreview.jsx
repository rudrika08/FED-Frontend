import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components";
import {Input} from "../../../../../components";
import { api } from "../../../../../services";
import styles from "./styles/CertificatePreview.module.scss";

const CertificatesPreview = () => {
  const { eventId, eventTitle } = useParams();
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState(null);
  const [subject, setSubject] = useState("Lorem");
  const [description, setDescription] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock certificate schema
  const certificateSchema = {
    img: "https://via.placeholder.com/600x300.png?text=Certificate+Preview",
    title: "Certificate of Achievement",
    recipientName: "John Doe",
    description: "Awarded for outstanding performance.",
    date: "2025-01-20",
    issuer: "ABC Organization",
  };

  // Fetch certificate data from JSON schema
  useEffect(() => {
    const fetchCertificateData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/certificate/getSchema/${eventId}`);
        if (response.status === 200) {
          setCertificateData(response.data);
        } else {
          setCertificateData(certificateSchema); // Use mock schema if API fails
        }
      } catch (error) {
        console.error("Error fetching certificate data:", error);
        setCertificateData(certificateSchema); // Use mock schema if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [eventId]);

  const handleSendTestMail = () => {
    // Implement the logic to send a test mail
    console.log("Sending test mail to:", recipientEmail);
    console.log("Subject:", subject);
    console.log("Description:", description);
  };

  const handleCreateNow = () => {
    // Redirect to the certificate creation page
    navigate(`/certificate/create/${eventId}`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center" }}>{eventTitle || "Event Name"} Certificate Preview Modal</h2>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
        {/* Certificate Preview */}
        <div
          style={{
            width: "100%",
            height: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "20px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: certificateData?.img ? `url(${certificateData.img})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {loading ? (
            <p>Loading...</p>
          ) : !certificateData ? (
            <div style={{ textAlign: "center" }}>
              <p>Nothing to show</p>
              <Button onClick={handleCreateNow} style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "5px" }}>
                Create Now
              </Button>
            </div>
          ) : null}
        </div>

        {/* Subject, Description, and Recipient Email */}
        {certificateData && (
          <>
            <div style={{ width: "100%", marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Subject:</label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: "-1rem",
                  marginBottom: "30px"
                }}
              />
              <div className={styles.info} style={{display:"flex",justifyContent:"center", width:"100%", gap:"30px"}} >
              <div>
                <label style={{ display: "block", fontWeight: "bold" }}>Description:</label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "-1rem"
                  }}
                />
              </div>         
              <div>
                <label style={{ display: "block", fontWeight: "bold"}}>Recipient's Email ID:</label>
                <Input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginTop: "-1rem"
                  }}
                />
                </div>
              </div>
            </div>
            

            {/* Test Mail Button */}
            <Button onClick={handleSendTestMail} style={{ padding: "10px 20px", borderRadius: "5px", marginTop: "20px" }}>
              Test Mail
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificatesPreview;
