import React, { useRef, useState } from "react";
import styles from "./styles/Core.module.scss";
import { FaRegCalendarAlt, FaZhihu } from "react-icons/fa";
import Select, { components } from "react-select";
import DatePicker from "react-date-picker";
import { AiOutlineDown } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    outline: "none",
    border: "none",
    width: "100%",
    fontSize: "12px",
    backgroundColor: "transparent",
    borderRadius: "4px",
    color: "#fff",
    marginBottom: "8px",
    maxHeight:"2rem",
    marginLeft: "8px",
    marginRight: "8px",
    marginTop: "4px",
    position: "relative",
    padding: "6px",
    border: "1px solid rgba(211, 211, 211, 0.5)",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#fff !important",
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%",
    color: "#333",
    backgroundColor: "#fff",
    marginTop:0,
    marginLeft:8
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "orange" : "#fff",
    backgroundColor: "#333",
    width:"100%",
    "&:hover": {
      backgroundColor: "#33333390",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <AiOutlineDown
        color="#fff"
        size={20}
        style={{
          position: "absolute",
          right: "16px",
          top: "25%",
        }}
      />
    </components.DropdownIndicator>
  );
};

const Input = (props) => {
  const {
    type = "text",
    containerStyle,
    style,
    placeholder,
    value,
    onChange,
    label,
    options,
    name,
    showLabel = true,
    className,
    containerClassName,
    ...rest
  } = props;
  const dateRef = useRef(null);
  const [showPassword, setshowPassword] = useState(false);

  const getInputTypes = () => {
    switch (type) {
      case "text":
        return (
          <input
            name={name}
            className={`${styles.input} ${className}`}
            type={type}
            style={style || {}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        );

      case "number":
        return (
          <input
            name={name}
            className={styles.input}
            type={type}
            style={style || {}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        );

      case "textArea":
        return (
          <textarea
            name={name}
            className={`${styles.input} ${styles.inputTxtArea} ${className}`}
            type={type}
            style={style || {}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        );

      case "select":
        return (
          <>
            <Select
              name={name}
              placeholder={placeholder}
              value={options.find((option) => option.value === value) || ""}
              options={options}
              onChange={(selectedOption) => onChange(selectedOption.value)}
              styles={customStyles}
              components={{ DropdownIndicator }}
              isSearchable={false}
              className={className}
              {...rest}
            />
          </>
        );

      case "date":
        return (
          <>
            <DatePicker
              name={name}
              className={`${styles.input} ${styles.inputDate} ${className}`}
              ref={dateRef}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              clearIcon={null}
              style={style || {}}
              calendarIcon={<FaRegCalendarAlt color="#fff" size={20} />}
              {...rest}
            />
          </>
        );
      case "radio":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              name={name}
              className={styles.input}
              type={type}
              style={{ width: "auto" }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              {...rest}
            />
            <label
              style={{
                color: "#fff",
                fontSize: ".8em",
                marginLeft: "2px",
                marginTop: "-5px",
              }}
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        );
      case "checkbox":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <input
              name={name}
              className={styles.input}
              type={type}
              style={{ width: "auto" }}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              {...rest}
            />
            <label
              style={{
                color: "#fff",
                fontSize: ".8em",
                marginLeft: "2px",
                marginTop: "-5px",
              }}
              htmlFor={name}
            >
              {label}
            </label>
          </div>
        );

      case "password":
        return (
          <>
            <div
              style={{
                position: "relative",
              }}
            >
              <input
                name={name}
                maxLength={rest.maxLength || 20}
                max={rest.max || 20}
                className={styles.input}
                type={showPassword ? "text" : "password"}
                style={style || {}}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setshowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "25%",
                    cursor: "pointer",
                  }}
                  color="#fff"
                  size={18}
                />
              ) : (
                <FaEye
                  onClick={() => setshowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "25%",
                    cursor: "pointer",
                  }}
                  color="#fff"
                  size={18}
                />
              )}
            </div>
          </>
        );

      default:
        return (
          <input
            name={name}
            className={`${styles.input}  ${className}`}
            type={type}
            style={style || {}}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
          />
        );
    }
  };

  return (
    <div
      className={`${styles.containerInput} ${containerClassName}`}
      style={containerStyle || {}}
    >
      {showLabel && (
        <label
          style={{
            color: "#fff",
            marginBottom: "4px",
            fontSize: ".8em",
            marginLeft: "8px",
          }}
          htmlFor={label}
        >
          {label}
        </label>
      )}
      {getInputTypes()}
    </div>
  );
};

export default Input;
