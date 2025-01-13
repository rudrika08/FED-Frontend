import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios"; // Import axios for backend communication
import styles from "../CertificateForm/styles/CertificateForm.module.scss";
import CertificateManagement from "./CertificateManagement";

const CertificateForm = () => {
  const [name, setName] = useState("Prityanshu Singh");
  const [x, setX] = useState(0.5); // X Position as a percentage (50%)
  const [y, setY] = useState(0.5); // Y Position as a percentage (50%)
  const [fontSize, setFontSize] = useState(3); // Font size as a percentage of width
  const [fontColor, setFontColor] = useState("black");
  const [imgURL, setImgURL] = useState(
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/677d7b542222b706bfd2d571_Omega%20OC%20-%20Certificate.pdf.png"
  );

  const certificateRef = useRef(null);

  const handleNameChange = (e) => setName(e.target.value);
  const handleXChange = (e) => setX(Number(e.target.value) / 100);
  const handleYChange = (e) => setY(Number(e.target.value) / 100);
  const handleFontSizeChange = (e) => setFontSize(Number(e.target.value));
  const handleFontColorChange = (e) => setFontColor(e.target.value);
  const handleImgURLChange = (e) => setImgURL(e.target.value);

  // Save data to backend
  const handleSave = async () => {
    const payload = {
      x: x * 100, // Convert to percentage for backend
      y: y * 100, // Convert to percentage for backend
      imgURL,
    };

    try {
      const response = await axios.post("https://your-backend-endpoint/api/save", payload);
      alert(`Data saved successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleDownload = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, {
        useCORS: true, // Enables cross-origin image loading
        scale: 2, // Increases resolution of the output image
      });
      const link = document.createElement("a");
      link.download = "certificate.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className={styles.container}>
      {/* Form Section */}
      <div className={styles.form}>
        <h1 className={styles.heading}>Certificate Form</h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.td}>Name:</td>
              <td className={styles.td}>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={styles.input}
                />
              </td>
              
            </tr>
            <tr>
              <td className={styles.td}>X Position (%):</td>
              <td className={styles.td}>
                <input
                  type="number"
                  value={x * 100}
                  onChange={handleXChange}
                  className={styles.input}
                />
              </td>
              
            </tr>
            <tr>
              <td className={styles.td}>Y Position (%):</td>
              <td className={styles.td}>
                <input
                  type="number"
                  value={y * 100}
                  onChange={handleYChange}
                  className={styles.input}
                />
              </td>
              
            </tr>
            <tr>
              <td className={styles.td}>Font Size (vw):</td>
              <td className={styles.td}>
                <input
                  type="number"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className={styles.input}
                />
              </td>
             
            </tr>
            <tr>
              <td className={styles.td}>Font Color:</td>
              <td className={styles.td}>
                <input
                  type="text"
                  value={fontColor}
                  onChange={handleFontColorChange}
                  className={styles.input}
                />
              </td>
              
            </tr>
            <tr>
              <td className={styles.td}>Image URL:</td>
              <td className={styles.td}>
                <input
                  type="text"
                  value={imgURL}
                  onChange={handleImgURLChange}
                  className={styles.input}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.downloadButton} onClick={handleDownload}>
            Download Certificate
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className={styles.preview}>
        <div ref={certificateRef} className={styles.certificateContainer}>
          <img
            src={imgURL}
            alt="Certificate"
            className={styles.certificateImage}
          />
          <div
            className={styles.text}
            style={{
              left: `${x * 100}%`,
              top: `${y * 100}%`,
              fontSize: `${fontSize}vw`, // Relative font size
              color: fontColor,
            }}
          >
            {name}
          </div>
        </div>
      </div>
      <CertificateManagement />
    </div>
  );
};

export default CertificateForm;
