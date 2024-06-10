import React, { useEffect, useRef } from "react";
import styles from "./styles/Preview.module.scss";
import Input from "../../../../../components/Core/Input";

const PreviewEvent = ({ fields, open, handleClose }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap || !wrap.contains(e.target)) {
      handleClose();
    }
  };

  const getCheckInputs = (field) => {
    if (field.type === "checkbox" || field.type === "radio") {
      const valueToArray = field.value.split(",");
      return valueToArray.map((value, index) => (
        <div
          key={index}
          style={{
            marginTop: index === 0 ? ".5em" : "0",
          }}
        >
          <Input
            placeholder={value}
            label={value}
            showLabel={false}
            type={field.type}
            name={field.name}
          />
        </div>
      ));
    }
  };

  return (
    open && (
      <div ref={wrapperRef} className={styles.mainPreview}>
        <div className={styles.previewContainer}>
          {fields.length > 0 &&
            fields.map((field, index) => (
              <div key={index}>
                {field.type !== "checkbox" && field.type !== "radio" ? (
                  <Input
                    placeholder={field.value}
                    label={field.name}
                    type={field.type}
                    name={field.name}
                  />
                ) : (
                  <label
                    style={{
                      color: "#fff",
                      fontSize: ".8em",
                    }}
                  >
                    {field.name}
                  </label>
                )}
                {getCheckInputs(field)}
              </div>
            ))}
        </div>
      </div>
    )
  );
};

export default PreviewEvent;
