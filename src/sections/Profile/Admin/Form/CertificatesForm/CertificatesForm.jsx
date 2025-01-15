import { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../../components/Core/Input";
import { Button } from "../../../../../components";

const CertificatesForm = () => {
  const { eventId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [namePosition, setNamePosition] = useState({ x: 0, y: 0 });
  const [qrPosition, setQrPosition] = useState({ x: 0, y: 0 });
  const [sampleName, setSampleName] = useState("Sample Name");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCertificate(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNamePositionChange = async (e) => {
    const { name, value } = e.target;
    const updatedPosition = { ...namePosition, [name]: parseInt(value, 10) || 0 };
    setNamePosition(updatedPosition);

    try {
      const response = await fetch(`/api/certificates/test-name-position`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateImage: certificate,
          namePosition: updatedPosition,
          sampleName,
        }),
      });
      const data = await response.json();
      setMessage(data.message || "Name position updated");
    } catch (error) {
      console.error("Error testing name position:", error);
    }
  };

  const handleQrPositionChange = (e) => {
    const { name, value } = e.target;
    setQrPosition({ ...qrPosition, [name]: parseInt(value, 10) || 0 });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getCertificateByEventId`, { //doubt: have to check api here, for save and get
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          certificateImage: certificate,
          namePosition,
          qrPosition,
        }),
      });
      const data = await response.json();
      setMessage(data.message || "Certificate saved successfully");
    } catch (error) {
      console.error("Error saving certificate:", error);
      setMessage("Error saving certificate");
    } finally {
      setLoading(false);
    }
  };

  // const handleDownload = () => {
  //   if (certificate) {
  //     const link = document.createElement("a");
  //     link.href = certificate;
  //     link.download = "certificate.png";
  //     link.click();
  //   }
  // };

  return (
    <div style={{ padding: "20px" , marginRight: "30px" }}>
      <h2>Create <span style={{ color: "#FF8A00" }}>Certificate</span></h2><p>for  Event: {eventId}</p>
      <div style={{ display: "flex",  alignItems: "flex-start" , gap: "20px" , marginTop: "20px" }}>
        {/* Preview Section */}
        <div
          style={{
            width: "70%",
            height: "400px",
            border: "1px solid #ccc",
            marginBottom: "20px",
            position: "relative",
            backgroundImage: certificate ? `url(${certificate})` : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {certificate && (
            <>
              {/* Sample Name */}
              <div
                style={{
                  position: "absolute",
                  left: `${namePosition.x}%`,
                  top: `${namePosition.y}%`,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255, 255, 255, 0.8)",
                  padding: "2px 5px",
                  fontSize: "16px",
                }}
              >
                {sampleName}
                
              </div>
              {/* QR Code Placeholder */}
              <div
                style={{
                  position: "absolute",
                  left: `${qrPosition.x}%`,
                  top: `${qrPosition.y}%`,
                  width: "50px",
                  height: "50px",
                  background: "rgba(0, 0, 0, 0.1)",
                  border: "1px dashed #000",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </>
          )}
        </div>

        {/* Input Form */}
        <div style={{ width: "30%" , marginTop: "-10px" }}>
          <input type="file" label="Upload Certificate Image" onChange={handleCertificateChange} />
          <Input
            style={{ width: "100%" }}
            type="text"
            label="Sample Name"
            value={sampleName}
            onChange={(e) => setSampleName(e.target.value)}
          />
          
          <div style={{ display: "flex", gap: "10px", width: "100%"}}>
            <Input
              style={{ width: "100%" }}
              type="number"
              label="Name X (%)"
              name="x"
              value={namePosition.x}
              onChange={handleNamePositionChange}
            />
            <Input
              style={{ width: "100%" }}
              type="number"
              label="Name Y (%)"
              name="y"
              value={namePosition.y}
              onChange={handleNamePositionChange}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", width: "100%"}}>
            <Input
              style={{ width: "100%" }}
              type="number"
              label="QR X (%)"
              name="x"
              value={qrPosition.x}
              onChange={handleQrPositionChange}
            />
            <Input
              style={{ width: "100%" }}
              type="number"
              label="QR Y (%)"
              name="y"
              onChange={handleQrPositionChange}
            />
          </div>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Certificate"}
          </Button>
          {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CertificatesForm;
