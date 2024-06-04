import React from "react";
import styles from "./Style/form.module.scss";
import Input from "../Core/Input";
import { MdOutlineClose } from "react-icons/md";

const FormField = (props) => {
  const { field, formFields, setformFields, index } = props;

  const handleChangeValue = (value, property) => {
    const newFields = [...formFields];
    newFields[index][property] = value;
    // console.log(value, newFields[index][property]);
    setformFields(newFields);
  };

  const handleDeleteItem = () => {
    const removeItem = formFields.filter((item, i) => i !== index);
    setformFields(removeItem);
  };

  const fieldTypes = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Number",
      value: "number",
    },
    {
      label: "Radio",
      value: "radio",
    },
    {
      label: "Checkbox",
      value: "checkbox",
    },
    {
      label: "Date",
      value: "date",
    },
    {
      label: "Time",
      value: "time",
    },
  ];

  return (
    <div className={styles.mainFieldForm}>
      <Input
        value={field.name}
        placeholder="Enter Name"
        label="Field Name"
        name="Field_Name"
        className={styles.fieldInput}
        containerClassName={styles.containerInput}
        onChange={(e) => handleChangeValue(e.target.value, "name")}
      />
      <Input
        value={field.type}
        placeholder="Select Type"
        label="Field Type"
        name="Field_Type"
        type="select"
        className={styles.fieldInput}
        containerClassName={styles.containerInput}
        options={fieldTypes}
        onChange={(value) => handleChangeValue(value, "type")}
      />
      <Input
        value={field.value}
        name="Field_Value"
        placeholder="Enter Value"
        label="Field Value"
        className={styles.fieldInput}
        containerClassName={styles.containerInput}
        onChange={(e) => handleChangeValue(e.target.value, "value")}
      />

      {formFields.length > 1 && (
        <MdOutlineClose
          size={20}
          onClick={handleDeleteItem}
          color="#FF8A00"
          style={{
            cursor: "pointer",
            marginTop: "32px",
            marginLeft: "-12px",
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default FormField;
