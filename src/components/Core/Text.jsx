import React from "react";
import styles from "./styles/Core.module.scss";

const Text = (props) => {
  const {
    children,
    className,
    variant = "primary",
    type = "h6",
    style,
    onClick,
    ...rest
  } = props;

  const getTextVariant = () => {
    switch (type) {
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "h3":
        return styles.h3;
      case "h4":
        return styles.h4;
      case "h5":
        return styles.h5;
      case "h6":
        return styles.h6;
      case "p":
        return styles.body1;
      case "body2":
        return styles.body2;
      default:
        return styles.h6;
    }
  };

  const inlineStyle = {
    color: variant === "primary" ? "#fff" : "#FF8A00",
    ...style,
  };

  const getOnClick = () => {
    if (onClick) {
      return onClick;
    }
    return () => {};
  };

  return (
    <div
      style={inlineStyle}
      className={`${getTextVariant()} ${className}`}
      onClick={getOnClick()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Text;

