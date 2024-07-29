import React from "react";
import { Riple } from "react-loading-indicators";
import Props from "prop-types";

const ComponentLoading = ({ customStyles = {} }) => {
  const baseStyles = {
    height: "50%",
    padding: "3rem",
    marginTop: "3rem",
    marginBottom: "3rem",
    display: "flex",
    justifyContent: "center",
    ...customStyles, // Merge custom styles with base styles
  };

  return (
    <div style={baseStyles}>
      <Riple color="#FF5C00" size="large" text="" textColor="" />
    </div>
  );
};

ComponentLoading.propTypes = {
  customStyles: Props.object,
};

export default ComponentLoading;
