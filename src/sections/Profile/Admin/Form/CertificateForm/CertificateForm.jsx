import React, { useState } from "react";

const CertificateForm = () => {
  const [name, setName] = useState("Prityanshu Singh");
  const [x, setX] = useState(250); // Adjusted to ensure visibility
  const [y, setY] = useState(200); // Adjusted to ensure visibility
  const [fontSize, setFontSize] = useState(20); // Reduced for better alignment
  const [fontColor, setFontColor] = useState("black");

  const imageURL =
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/677d7b542222b706bfd2d571_Omega%20OC%20-%20Certificate.pdf.png";

  const handleNameChange = (e) => setName(e.target.value);
  const handleXChange = (e) => setX(Number(e.target.value));
  const handleYChange = (e) => setY(Number(e.target.value));
  const handleFontSizeChange = (e) => setFontSize(Number(e.target.value));
  const handleFontColorChange = (e) => setFontColor(e.target.value);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Certificate Form</h1>
      <table
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "60%",
          textAlign: "left",
          fontSize: "16px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>Name:</td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              X Position:
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <input
                type="number"
                value={x}
                onChange={handleXChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Y Position:
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <input
                type="number"
                value={y}
                onChange={handleYChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Font Size:
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <input
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              Font Color:
            </td>
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              <input
                type="text"
                value={fontColor}
                onChange={handleFontColorChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        <img
          src={imageURL}
          alt="Certificate"
          style={{ width: "800px", height: "auto" }}
        />
        <div
          style={{
            position: "absolute",
            left: `${x}px`,
            top: `${y}px`,
            fontSize: `${fontSize}px`,
            color: fontColor,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            zIndex: 10,
            fontWeight: "bold", // Optional: to make the text stand out
          }}
        >
          {name}
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
