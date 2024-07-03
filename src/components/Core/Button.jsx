import React from "react";
import styles from "./styles/Core.module.scss";

const Button = (props) => {
  const {
    variant = "primary",
    children,
    isLoading,
    onClick,
    style,
    ...rest
  } = props;

  const combinedStyle = {
    // color: variant === "primary" ? "#FF8A00" : "#fff",
    background: variant === "primary" ? "var(--primary)" : "transparent",
    WebkitBackgroundClip: variant === "primary" ? "text" : "initial",
    color: variant === "primary" ? "transparent" : "inherit",
    cursor: isLoading? "not-allowed" : "pointer",
    backgroundColor: variant === "primary" ? "#2D2D2D" : "transparent",
    borderColor: variant === "primary" ? "#2D2D2D" : "#fff",
    ...style,
  };

  return (
    <button
      className={styles.main_Button}
      style={combinedStyle}
      disabled={isLoading}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
