import React, { useState } from "react";
import Text from "../Core/Text";
import Button from "../Core/Button";
import Input from "../Core/Input";
import FormField from "./FormField";
import PreviewEvent from "../PreviewEvent/PreviewEvent";
import styles from "./Style/form.module.scss";
const MainForm = () => {
  const [data, setdata] = useState({
    title: "",
    description: "",
    amount: "",
    priority: "",
    formelement: [
      {
        name: "",
        type: "",
        value: "",
        required: true,
      },
    ],
    event: "",
    active: true,
    isTeam: false,
    teamsize: 0,
    maxReg: 0,
    upi: "",
    img: "",
    date: "",
    mail: "",
  });
  const [formFields, setformFields] = useState([
    { name: "", type: "", value: "" },
  ]);
  const [showPreview, setshowPreview] = useState(false);

  const validateFields = () => {
    const fields = formFields.map((field) => {
      if (field.name === "" || field.type === "" || field.value === "") {
        return false;
      }
      return true;
    });

    return fields.includes(false) ? false : true;
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className={styles.formHeader}>
        <Text
          variant="secondary"
          style={{
            fontSize: "16px",
            margin: "auto 0",
          }}
        >
          New Form
        </Text>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Button>Save</Button>
          <Button
            onClick={() => {
              if (validateFields()) {
                setshowPreview(!showPreview);
              } else {
                alert("Fill all the fields");
              }
            }}
            variant="secondary"
          >
            {showPreview ? "Hide" : "Preview"}
          </Button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "45%",
          }}
        >
          <Input
            placeholder="Enter Form Name"
            label="Form Name"
            value={data.title}
            className={styles.formInput}
            onChange={(e) => setdata({ ...data, title: e.target.value })}
          />
          <Input
            placeholder="Logo Link"
            label="Event Logo"
            className={styles.formInput}
          />
          <Input
            placeholder="Select Date"
            className={styles.formInput}
            label="Event Date"
            type="date"
          />
          <Input
            placeholder="Event Type"
            label="Select Type"
            type="select"
            className={styles.formInput}
            options={[
              { label: "Something", value: "Something" },
              { label: "Working", value: "Workking" },
            ]}
          />

          <Input
            label="Related Event Name"
            placeholder="Select Type"
            type="select"
            className={styles.formInput}
            options={[
              { label: "Something", value: "Something" },
              { label: "Working", value: "Workking" },
            ]}
          />
          <Input
            label="Participation Type"
            placeholder="Select Type"
            className={styles.formInput}
            type="select"
            options={[
              { lable: "Something2", value: "something2", selected: true },
              { label: "Something", value: "Something" },
              { label: "Working", value: "Workking" },
            ]}
          />
          <Input
            placeholder="Logo Link"
            className={styles.formInput}
            label="Priority"
          />
        </div>
        <div
          style={{
            width: "45%",
          }}
        >
          <Input
            placeholder="Enter Event Description"
            label="Event Description"
            type="textArea"
            className={` ${styles.formInputTxtArea}`}
          />
          <Input
            placeholder="Enter Message"
            label="Registration Success Message"
            type="textArea"
            className={` ${styles.formInputTxtArea}`}
          />
          <Input
            placeholder="Enter Number"
            className={styles.formInput}
            label="Maximum Registrations"
          />
        </div>
      </div>
      <Text
        style={{
          fontSize: "14px",
          margin: "6px",
          marginBottom: "12px",
        }}
      >
        Field Details
      </Text>
      <div className={styles.formFieldContainer}>
        {formFields.map((field, index) => (
          <FormField
            field={field}
            formFields={formFields}
            setformFields={setformFields}
            index={index}
          />
        ))}
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          setformFields([...formFields, { name: "", type: "", value: "" }]);
        }}
      >
        Add Field
      </Button>
      <PreviewEvent
        open={showPreview}
        handleClose={() => setshowPreview(false)}
        fields={formFields}
        data={data}
      />{" "}
    </div>
  );
};

export default MainForm;
