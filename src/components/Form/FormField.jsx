import PropTypes from 'prop-types';
import styles from "./styles/Form.module.scss";
import Input from "../Core/Input";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState } from "react";
import PopField from "./PopField";
import Switch from "react-switch";

const hasOptions = ["radio", "checkbox", "select"];

function FormField(props) {
  const {
    field,
    lastField,
    section,
    setformFields,
    onRemoveField,
    sections,
    onFieldValidationChange,
    addNewValidation,
    onRemoveValidation,
  } = props;
  const [showPopMenu, setshowPopMenu] = useState(false);
  const showMenu =
    field.type &&
    field.value &&
    hasOptions.includes(field.type) &&
    lastField?._id === field?._id;

  const handleChangeValue = (value, property) => {
    const newFields = [...section.fields];
    const fieldIndex = newFields.findIndex((fld) => fld._id === field?._id);

    if (fieldIndex === -1) {
      console.error("Field not found");
      return;
    }

    newFields[fieldIndex][property] = value;

    if (property === "value") {
      const values = value.split(",");
      if (values.length > 1) {
        newFields[fieldIndex].type = field.type || "select";
        newFields[fieldIndex].validations = values.map((val, idx) => ({
          _id: Date.now() + idx,
          condition: val.trim(),
          target: field.validations[0]?.target || "Submit",
        }));
      }
    }

    if (property === "type" && hasOptions.includes(value)) {
      const values = property === "value" && value.split(",");
      if (values.length > 0) {
        newFields[fieldIndex].value = field.value || "";
        newFields[fieldIndex].validations = values.map((val, idx) => ({
          _id: Date.now() + idx,
          condition: val.trim(),
          target: field.validations[0]?.target || "Submit",
        }));
      }
    } else if (property === "type" && !hasOptions.includes(value)) {
      newFields[fieldIndex].value = "";
      newFields[fieldIndex].validations = [];
    }

    setformFields(newFields);
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
      label: "List",
      value: "select",
    },
    {
      label: "Date",
      value: "date",
    },
  ];

  return (
    <>
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
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          marginRight: "auto",
        }}
      >
        <Switch
          checked={field.isRequired}
          width={36}
          height={18}
          onColor="#FF8A00"
          checkedIcon={false}
          uncheckedIcon={false}
          title="Is this field required?"
          onChange={(value) => handleChangeValue(value, "isRequired")}
        />
      </div>
      {section.fields?.length > 1 && (
        <MdOutlineClose
          size={22}
          onClick={onRemoveField}
          color="#FF8A00"
          style={{
            cursor: "pointer",
            marginTop: "12px",
            zIndex: 10,
          }}
        />
      )}
      {showMenu && (
        <HiOutlineDotsVertical
          onClick={() => {
            setshowPopMenu(!showPopMenu);
          }}
          size={20}
          color="#FF8A00"
          style={{
            cursor: "pointer",
            marginTop: "10px",
            marginLeft: !["text", "number", "date"].includes(field.type)
              ? "8px"
              : "auto",
            zIndex: 10,
          }}
        />
      )}
      {showPopMenu && (
        <PopField
          field={field}
          onFieldValidationChange={onFieldValidationChange}
          handleClose={() => setshowPopMenu(false)}
          sections={sections.filter((sec) => sec._id !== section._id)}
          onAddValidation={addNewValidation}
          onRemoveValidation={onRemoveValidation}
        />
      )}
    </div>
    </>
  );
}

FormField.propTypes = {
  field: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'text',
      'number',
      'radio',
      'checkbox',
      'select',
      'date',
    ]).isRequired,
    value: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    validations: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  lastField: PropTypes.object,
  section: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired,
  }).isRequired,
  setformFields: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired,
  sections: PropTypes.array.isRequired,
  onFieldValidationChange: PropTypes.func.isRequired,
  addNewValidation: PropTypes.func.isRequired,
  onRemoveValidation: PropTypes.func.isRequired,
};

export default FormField;
