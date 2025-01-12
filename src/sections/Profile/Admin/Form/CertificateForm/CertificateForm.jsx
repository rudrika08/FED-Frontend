
import React, { useState } from "react";
import styles from "../CertificateForm/styles/CertificateForm.module.scss";

const CertificateForm = () => {
  const [name, setName] = useState("Prityanshu Singh");
  const [x, setX] = useState(250); // Adjusted to ensure visibility
  const [y, setY] = useState(200); // Adjusted to ensure visibility
  const [fontSize, setFontSize] = useState(20); // Reduced for better alignment
  const [fontColor, setFontColor] = useState("black");
  const [imgURL, setImgURL] = useState(
    "https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/677d7b542222b706bfd2d571_Omega%20OC%20-%20Certificate.pdf.png"
  );

  const handleNameChange = (e) => setName(e.target.value);
  const handleXChange = (e) => setX(Number(e.target.value));
  const handleYChange = (e) => setY(Number(e.target.value));
  const handleFontSizeChange = (e) => setFontSize(Number(e.target.value));
  const handleFontColorChange = (e) => setFontColor(e.target.value);
  const handleImgURLChange = (e) => setImgURL(e.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.certificateContainer}>
        <img
          src={imgURL}
          alt="Certificate"
          className={styles.certificateImage}
        />
        <div
          className={styles.text}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            fontSize: `${fontSize}px`,
            color: fontColor,
          }}
        >
          {name}
        </div>
      </div>

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
            <td className={styles.td}>X Position:</td>
            <td className={styles.td}>
              <div className={styles.inputWithButtons}>
                <button
                  className={styles.arrowButton}
                  onClick={() => setX(x - 1)}
                >
                  ▲
                </button>
                <input
                  type="number"
                  value={x}
                  onChange={handleXChange}
                  className={styles.input}
                />
                <button
                  className={styles.arrowButton}
                  onClick={() => setX(x + 1)}
                >
                  ▼
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>Y Position:</td>
            <td className={styles.td}>
              <div className={styles.inputWithButtons}>
                <button
                  className={styles.arrowButton}
                  onClick={() => setY(y - 1)}
                >
                  ▲
                </button>
                <input
                  type="number"
                  value={y}
                  onChange={handleYChange}
                  className={styles.input}
                />
                <button
                  className={styles.arrowButton}
                  onClick={() => setY(y + 1)}
                >
                  ▼
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>Font Size:</td>
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
        </tbody>
      </table>

      <div className={styles.fixedBottom}>
        <div className={styles.imgURLInputContainer}>
          <label htmlFor="imgURL" className={styles.label}>
            Image URL:
          </label>
          <input
            type="text"
            id="imgURL"
            value={imgURL}
            onChange={handleImgURLChange}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateForm;
