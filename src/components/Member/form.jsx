import React from "react";
import styles from "./styles/form.module.scss";
import Input from "../Core/Input";

const FormPage = () => {
  const memberDesignation = [
    {
      value: "Alumini",
      label: "Alumini",
    },
    {
      value: "Technical",
      label: "Technical",
    },
    {
      value: "Creative",
      label: "Creative",
    },
    {
      value: "Marketing",
      label: "Marketing",
    },
    {
      value: "Sponsorship & PR",
      label: "Sponsorship & PR",
    },
    {
      value: "Operations",
      label: "Operations",
    },
    {
      value: "Directors",
      label: "Directors",
    },
  ];
  return (
    <div className={styles.main}>
      <div className={styles.formHead}>
        <Input
          placeholder="Name"
          type="text"
          label="Enter Member Name"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Member Email"
          type="text"
          label="Email"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
        />
      </div>
      <div className={styles.formHead}>
        <Input
          placeholder="Enter Your Department"
          type="select"
          label="Department"
          options={memberDesignation}
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Photo Link"
          type="text"
          label="Photo"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default FormPage;
