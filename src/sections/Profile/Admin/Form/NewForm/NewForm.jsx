import { useState, useRef } from "react";
import { Button, Input, Text, Section } from "../../../../../components";
import { PreviewForm } from "../../../../../features";

import styles from "./styles/NewForm.module.scss";

import Switch from "react-switch";
import moment from "moment";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";

function NewForm() {
  const scrollRef = useRef(null);
  const [isVisibility, setisVisibility] = useState(true);
  const [data, setdata] = useState({
    _id: Date.now(),
    title: "",
    logoLink: "",
    eventDate: "",
    eventType: "",
    amount: "",
    relatedEvent: "",
    participationType: "",
    minSize: "",
    maxSize: "",
    priority: "",
    description: "",
    successMessage: "",
    maxReg: "",
    openDT: "",
    isRegEnd: false,
    isEventPast: false,
    isPublic: false,
  });
  const [sections, setsections] = useState([
    {
      _id: Date.now(),
      name: 'Basic Details',
      fields: [
        {
          _id: Date.now(),
          name: "",
          type: "",
          value: "",
          isRequired: true,
          validations: [
            {
              _id: Date.now(),
              condition: "",
              target: "Submit",
            },
          ],
        },
      ],
    },
  ]);
  const [showPreview, setshowPreview] = useState(false);

  const isValidSections = () => {
    let valid = true;
    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (!field.name || !field.type || !field.value) {
          valid = false;
        }
        if (["radio", "checkbox", "select"].includes(field.type)) {
          field.validations.forEach((validation) => {
            if (!validation.condition || !validation.target) {
              valid = false;
            }
          });
        }
      });
    });
    return valid;
  };

  const isValidEvent = () => {
    if (!data.title) {
      alert("Title is required.");
      return false;
    }

    if (!data.logoLink) {
      alert("Logo link is required.");
      return false;
    }
    if (!data.eventDate) {
      alert("Event date is required.");
      return false;
    }
    if (!data.eventType) {
      alert("Event type is required.");
      return false;
    }
    if (!data.relatedEvent) {
      alert("Related event is required.");
      return false;
    }
    if (!data.participationType) {
      alert("Participation type is required.");
      return false;
    }
    if (!data.priority) {
      alert("Priority is required.");
      return false;
    }
    if (!data.description) {
      alert("Description is required.");
      return false;
    }
    if (!data.successMessage) {
      alert("Success message is required.");
      return false;
    }
    if (!data.maxReg) {
      alert("Maximum registration is required.");
      return false;
    }
    if (data.eventType === "Paid" && !data.amount) {
      alert("Amount is required.");
      return false;
    }
    if (data.participationType === "Team" && !data.maxSize) {
      alert("Team size is required.");
      return false;
    }
    if (data.participationType === "Team" && !data.minSize) {
      alert("Minimum team size is required.");
      return false;
    }
    return true;
  };

  const onSaveEvent = () => {
    if (isValidEvent()) {
      const form = {
        ...data,
        sections,
      };
      console.log("form", form);
    }
  };

  const onAddSection = () => {
    const lastSection = sections[sections.length - 1];
    const sectionName = prompt("Enter Section Name");
    if (sectionName) {
      const newSectionID = Date.now();
      const newSection = {
        name: sectionName,
        _id: newSectionID,
        fields: [
          {
            _id: Date.now(),
            name: "",
            type: "",
            value: "",
            isRequired: true,
            validations: [
              {
                _id: Date.now(),
                condition: "",
                target: "Submit",
              },
            ],
          },
        ],
      };

      if (lastSection) {
        const updatedLastSection = {
          ...lastSection,
          fields: lastSection.fields.map((field) => ({
            ...field,
            validations: field.validations.map((validation) => ({
              ...validation,
              target: newSectionID,
            })),
          })),
        };

        setsections([
          ...sections.slice(0, sections.length - 1),
          updatedLastSection,
          newSection,
        ]);
      } else {
        setsections([...sections, newSection]);
      }
      setTimeout(() => {
        scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  };

  const handleChangeTeamSize = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || !value) {
      setdata({ ...data, maxSize: "" });
      setsections(
        sections.filter((section) => section.name !== "Team Members")
      );
    }
    if (value === 0 || value > 7) {
      alert("Team size should be between 1 and 7.");
    } else {
      if (typeof value === "number" && value > 0 && value <= 7) {
        setdata({ ...data, maxSize: value });

        const fields = Array.from({ length: value }, (_, index) => [
          {
            _id: Date.now() + index * 3 + 1,
            name: `Enter ${getOrdinalSuffix(index + 1)} Member Name`,
            type: "text",
            value: "Enter Member Name",
            isRequired: true,
            validations: [],
          },
          {
            _id: Date.now() + index * 3 + 2,
            name: `Enter ${getOrdinalSuffix(index + 1)} Member Email`,
            type: "text",
            value: "Enter Email",
            isRequired: true,
            validations: [],
          },
          {
            _id: Date.now() + index * 3 + 3,
            name: `Enter ${getOrdinalSuffix(index + 1)} Member Roll Number`,
            type: "number",
            value: "Enter Roll Number",
            isRequired: true,
            validations: [],
          },
        ]).flat();
        const sectionId = Date.now();
        const newSection = {
          _id: sectionId,
          name: "Team Members",
          fields: fields,
        };

        const isHavingTeamSection = sections.some(
          (section) => section.name === "Team Members"
        );

        if (isHavingTeamSection) {
          const updatedSections = sections.map((section) => {
            if (section.name === "Team Members") {
              return newSection;
            }
            return section;
          });
          setsections(updatedSections);
        } else {
          setsections([...sections, newSection]);
        }
      }
    }
  };

  const getOrdinalSuffix = (num) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = num % 100;
    const suffix =
      suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    return `${num}${suffix}`;
  };

  const handleChangeMinSize = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1 || !value) {
      setdata({ ...data, minSize: "" });
    }
    if (value === 0 || value >= 7) {
      alert("Team size should be between 1 and 7.");
    } else {
      setdata({ ...data, minSize: value });
    }
  };

  const handleSaveSection = () => {
    if (isValidSections()) {
      console.log("Sections", sections);
    } else {
      alert("Fill all the form fields, including conditions");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        marginLeft:"70px"
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
          <div
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginRight: "12px",
            }}
          >
            {isVisibility ? (
              <IoSettingsSharp
                size={20}
                color="#FF8A00"
                style={{ cursor: "pointer" }}
                onClick={() => setisVisibility(!isVisibility)}
              />
            ) : (
              <IoSettingsOutline
                size={20}
                style={{ cursor: "pointer" }}
                color="#fff"
                onClick={() => setisVisibility(!isVisibility)}
              />
            )}
          </div>

          <Button onClick={onSaveEvent}>Save</Button>
          <Button
            isLoading={false}
            onClick={() => {
              if (isValidSections()) {
                setshowPreview(!showPreview);
              } else {
                alert("Fill all the form fields, including conditions");
              }
            }}
            variant="secondary"
          >
            {showPreview ? "Hide" : "Preview"}
          </Button>
        </div>
      </div>
      {isVisibility && (
        <div
          style={{
            backgroundColor: "rgba(128, 127, 126, 0.066)",
            width: "86%",
            margin: ".5em 0",
            padding: "1.6em",
            borderRadius: "8px",
            marginBottom: "1em",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                color: "#fff",
                margin: "4px 0",
                fontSize: ".8em",
                opacity: data.isPublic ? "1" : ".6",
                transition: "all .4s",
              }}
            >
              Public Mode (Public/Private)
            </label>
            <Switch
              checked={data.isPublic}
              width={36}
              height={18}
              onColor="#FF8A00"
              checkedIcon={false}
              placeholder="Mode (Public/Private)"
              uncheckedIcon={false}
              title="Mode (Public/Private)"
              onChange={() => {
                setdata({
                  ...data,
                  isPublic: !data.isPublic,
                });
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "1em 0",
            }}
          >
            <label
              style={{
                color: "#fff",
                margin: "4px 0",
                fontSize: ".8em",
                opacity: data.isRegEnd ? "1" : ".6",
                transition: "all .4s",
              }}
            >
              Close Event Registration
            </label>
            <Switch
              checked={data.isRegEnd}
              width={36}
              height={18}
              onColor="#FF8A00"
              checkedIcon={false}
              placeholder="Close Event Registration"
              uncheckedIcon={false}
              title="Close Event Registration"
              onChange={() => {
                setdata({
                  ...data,
                  isRegEnd: !data.isRegEnd,
                });
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label
              style={{
                color: "#fff",
                margin: "4px 0",
                fontSize: ".8em",
                opacity: data.isEventPast ? "1" : ".6",
                transition: "all .4s",
              }}
            >
              Event Past/Ongoing
            </label>
            <Switch
              checked={data.isEventPast}
              width={36}
              height={18}
              onColor="#FF8A00"
              checkedIcon={false}
              placeholder="Event Past/Ongoing"
              uncheckedIcon={false}
              title="Event Past/Ongoing"
              onChange={() => {
                setdata({
                  ...data,
                  isEventPast: !data.isEventPast,
                });
              }}
            />
          </div>
        </div>
      )}
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
            value={data.logoLink}
            onChange={(e) => setdata({ ...data, logoLink: e.target.value })}
            className={styles.formInput}
          />
          <Input
            placeholder="Select Date"
            className={styles.formInput}
            label="Event Date"
            type="date"
            style={{ width: "88%" }}
            value={data.eventDate}
            onChange={(date) => setdata({ ...data, eventDate: date })}
          />
          <Input
            placeholder="Event Type"
            label="Select Type"
            type="select"
            className={styles.formInput}
            options={[
              { label: "Paid", value: "Paid" },
              { label: "Free", value: "Free" },
            ]}
            style={{ width: "88%" }}
            value={data.eventType}
            onChange={(value) => setdata({ ...data, eventType: value })}
          />
          {data.eventType === "Paid" && (
            <Input
              placeholder="Enter Amount"
              label="Amount"
              type="number"
              value={data.amount}
              onChange={(e) => setdata({ ...data, amount: e.target.value })}
              className={styles.formInput}
            />
          )}
          <Input
            placeholder="Enter Event Name"
            label="Related Event Name"
            value={data.relatedEvent}
            className={styles.formInput}
            onChange={(e) => setdata({ ...data, relatedEvent: e.target.value })}
          />
          <Input
            label="Participation Type"
            placeholder="Select Type"
            className={styles.formInput}
            type="select"
            options={[
              { label: "Individual", value: "Individual" },
              { label: "Team", value: "Team" },
            ]}
            style={{ width: "88%" }}
            value={data.participationType}
            onChange={(value) => setdata({ ...data, participationType: value })}
          />
          {data.participationType === "Team" && (
            <div>
              <Input
                placeholder="Enter Team Size "
                label="Team Size (Min)"
                type="number"
                className={styles.formInput}
                value={data.minSize}
                onChange={handleChangeMinSize}
              />
              <Input
                placeholder="Enter Team Size "
                label="Team Size (Max)"
                type="number"
                className={styles.formInput}
                value={data.maxSize}
                onChange={handleChangeTeamSize}
              />
            </div>
          )}
          <Input
            placeholder="Event Priority"
            className={styles.formInput}
            label="Priority"
            value={data.priority}
            onChange={(e) => setdata({ ...data, priority: e.target.value })}
          />
          <Input
            placeholder="Open Date & Time"
            className={styles.formInput}
            label="Event Open Date & Time"
            type="datetime-local"
            value={data.openDT}
            onChange={(date) => {
              setdata({
                ...data,
                openDT: moment(date).format("MMMM Do YYYY, h:mm:ss a"),
              });
            }}
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
            value={data.description}
            onChange={(e) => setdata({ ...data, description: e.target.value })}
          />
          <Input
            placeholder="Enter Message"
            label="Registration Success Message"
            type="textArea"
            className={` ${styles.formInputTxtArea}`}
            value={data.successMessage}
            containerStyle={{ marginTop: "12px" }}
            onChange={(e) =>
              setdata({ ...data, successMessage: e.target.value })
            }
          />
          <Input
            placeholder="Enter Number"
            className={styles.formInput}
            label="Maximum Registrations"
            type="number"
            value={data.maxReg}
            containerStyle={{ marginTop: "12px" }}
            onChange={(e) => setdata({ ...data, maxReg: e.target.value })}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          width: "86%",
          marginBottom: "12px",
        }}
      >
        <Text
          style={{
            fontSize: "14px",
            margin: "auto 6px",
            marginRight: "auto",
          }}
        >
          Sections
        </Text>
        <Button onClick={handleSaveSection}>Save</Button>
        <Button
          variant="secondary"
          style={{ marginLeft: "12px" }}
          onClick={onAddSection}
        >
          Add Section
        </Button>
      </div>
      {sections.map((section) => (
        <div key={section._id} ref={scrollRef}>
          <Section
            section={section}
            sections={sections}
            setsections={setsections}
          />
        </div>
      ))}
      {showPreview && (
        <PreviewForm
          open={showPreview}
          handleClose={() => setshowPreview(false)}
          sections={sections}
          eventData={data}
        />
      )}
    </div>
  );
}

export default NewForm;
