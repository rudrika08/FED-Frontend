import { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../../../components/Core/Input";
import { Button } from "../../../../../components";
import { api } from "../../../../../services";
import { accessOrCreateEventByFormId } from "./tools/certificateTools";

const CertificatesForm = () => {
  const { eventId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [responseImg, setResponseImg] = useState("");

  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCertificate(reader.result);
      setCertificateFile(file);
      reader.readAsDataURL(file);
    }
  };

  // console.log(accessOrCreateEventByFormId(eventId));

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const addField = () => {
    setFields([
      ...fields,
      {
        fieldName: "",
        x: 0,
        y: 0,
        fontSize: 16,
        fontColor: "#000000",
        minimized: false,
      },
    ]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleRefresh = async () => {
    if (!certificateFile) {
      setMessage("Please upload a certificate image first.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", certificateFile);
      formData.append("fields", JSON.stringify(fields));
      const response = await api.post(
        "/api/certificate/dummyCertificate",
        formData
      );
      if (response.status !== 200) {
        throw new Error(`API error: ${response.statusText}`);
      }
      setResponseImg(response.data.imageSrc);
      setMessage(response.data.message || "Certificate updated successfully");
    } catch (error) {
      setMessage("Error updating certificate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!certificateFile) {
      setMessage("Please upload a certificate image first.");
      return;
    }
    setLoading(true);
    try {
      const eventData = await accessOrCreateEventByFormId(eventId);
      // console.log(eventData, "eventData in handleSave");
      if (!eventData || !eventData.id) {
        throw new Error("Failed to retrieve or create event.");
      }
      const formData = new FormData();
      formData.append("image", certificateFile);
      formData.append("eventId", eventData.id);
      formData.append("fields", JSON.stringify(fields));
      const response = await api.post(
        "/api/certificate/addCertificateTemplate",
        formData
      );
      // console.log(response, "formdata response in handleSave");
      if (response.status !== 200) {
        throw new Error(`API error: ${response.statusText}`);
      }
      // setResponseImg(response.data.imageSrc);
      setMessage(
        response.data.message || "Certificate template saved successfully"
      );
    } catch (error) {
      console.error("Error saving certificate template:", error);
      setMessage("Error saving certificate template. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", marginRight: "30px" }}>
      <h2>
        Create <span style={{ color: "#FF8A00" }}>Certificate</span>
      </h2>
      <p>for Event: {eventId}</p>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{
            width: "70%",
            height: "400px",
            border: "1px solid #ccc",
            backgroundImage: responseImg
              ? `url(${responseImg})`
              : certificate
              ? `url(${certificate})`
              : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div style={{ width: "30%" }}>
          <input type="file" onChange={handleCertificateChange} />
          <Button onClick={addField}>+ Add Field</Button>

          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {fields.map((field, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong>{field.fieldName || `Field ${index + 1}`}</strong>
                  <button
                    onClick={() =>
                      handleFieldChange(index, "minimized", !field.minimized)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {field.minimized ? "Open" : "Close"}
                  </button>
                </div>
                {!field.minimized && (
                  <>
                    <Input
                      type="text"
                      label="Field Name"
                      value={field.fieldName}
                      onChange={(e) =>
                        handleFieldChange(index, "fieldName", e.target.value)
                      }
                    />
                    <Input
                      type="number"
                      label="X Position (%)"
                      value={field.x}
                      onChange={(e) =>
                        handleFieldChange(index, "x", Number(e.target.value))
                      }
                    />
                    <Input
                      type="number"
                      label="Y Position (%)"
                      value={field.y}
                      onChange={(e) =>
                        handleFieldChange(index, "y", Number(e.target.value))
                      }
                    />
                    <Input
                      type="number"
                      label="Font Size"
                      value={field.fontSize}
                      onChange={(e) =>
                        handleFieldChange(
                          index,
                          "fontSize",
                          Number(e.target.value)
                        )
                      }
                    />
                    <Input
                      type="color"
                      label="Font Color"
                      value={field.fontColor}
                      onChange={(e) =>
                        handleFieldChange(index, "fontColor", e.target.value)
                      }
                    />
                  </>
                )}
                <Button
                  onClick={() => removeField(index)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginTop: "10px",
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <Button onClick={handleRefresh} disabled={loading}>
            {loading ? "Updating..." : "Refresh"}
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            style={{ backgroundColor: "#FF8A00", color: "white" }}
          >
            Save Certificate
          </Button>
          {message && (
            <p style={{ marginTop: "10px", color: "green" }}>{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatesForm;
