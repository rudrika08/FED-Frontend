import { useState } from "react";
import styles from "./styles/AddMemberForm.module.scss";
import {Button, Input} from "../../../../../components";

function AddMemberForm() {
  const [data, setdata] = useState({
    name: "",
    email: "",
    department: "",
    photo: "",
    linkedin: "",
    github: "",
  });
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

  const isFormValid = () => {
    if (
      data.name === "" ||
      data.email === "" ||
      data.department === "" ||
      data.photo === "" ||
      data.linkedin === "" ||
      data.github === ""
    ) {
      return false;
    }
    return true;
  };

  const onAddMember = () => {
    if (isFormValid()) {
      const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const validLink = /^(ftp|http|https):\/\/[^ "]+$/;
      const validPhoto = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

      const isValidEmail = validEmail.test(data.email);
      const isValidLinkedin = validLink.test(data.linkedin);
      const isValidGithub = validLink.test(data.github);
      const isValidPhoto = validPhoto.test(data.photo);

      if (isValidEmail && isValidLinkedin && isValidGithub && isValidPhoto) {
        console.log(data);
        setdata({
          name: "",
          email: "",
          department: "",
          photo: "",
          linkedin: "",
          github: "",
        });
        alert("Member Added Successfully");
      } else {
        alert("Please enter valid data");
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.formHead}>
        <Input
          placeholder="Name"
          type="text"
          label="Enter Member Name"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
          value={data.name}
          onChange={(e) => setdata({ ...data, name: e.target.value })}
        />
        <Input
          placeholder="Enter Member Email"
          type="text"
          label="Email"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
          value={data.email}
          onChange={(e) => setdata({ ...data, email: e.target.value })}
        />
      </div>
      <div className={styles.formHead}>
        <Input
          placeholder="Enter Member Department"
          type="select"
          label="Department"
          options={memberDesignation}
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
          value={data.department}
          onChange={(value) => setdata({ ...data, department: value })}
        />
        <Input
          placeholder="Enter Member Photo Link"
          type="text"
          label="Photo"
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
          value={data.photo}
          onChange={(e) => setdata({ ...data, photo: e.target.value })}
        />
      </div>
      <div className={styles.formHead}>
        <Input
          placeholder="Enter Member LinkedIn Link"
          type="text"
          label="LinkedIn"
          className={styles.memberInput}
          value={data.linkedin}
          onChange={(e) => setdata({ ...data, linkedin: e.target.value })}
          containerStyle={{ width: "100%" }}
        />
        <Input
          placeholder="Enter Member Github Link"
          type="text"
          label="Github"
          value={data.github}
          onChange={(e) => setdata({ ...data, github: e.target.value })}
          className={styles.memberInput}
          containerStyle={{ width: "100%" }}
        />
      </div>
      <Button onClick={onAddMember} disabled={!isFormValid()}>
        Add Member
      </Button>
    </div>
  );
}

export default AddMemberForm;
