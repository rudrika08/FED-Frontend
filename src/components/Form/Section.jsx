import { useState, useRef } from "react";
import FormField from "./FormField";
import styles from "./styles/Form.module.scss";
import Button from "../Core/Button"
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Section = (props) => {
  const { section, sections, setsections } = props;
  const [hideSection, sethideSection] = useState(false);
  const scrollRef = useRef(null);

  const onAddField = () => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        const lastFieldIndex = section.fields[section.fields.length - 1];
        const newFieldId = Date.now();
        if (lastFieldIndex !== undefined) {
          lastFieldIndex.validations = [];
        }
        const newFields = [
          ...sec.fields,
          {
            _id: newFieldId,
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
        ];
        return {
          ...sec,
          fields: newFields,
        };
      }
      return sec;
    });
    setsections(newSections);
    setTimeout(() => {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  const onUpdateField = (field) => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        const newFields = sec.fields.map((fld) => {
          if (fld._id === field._id) {
            return field;
          }
          return fld;
        });
        return {
          ...sec,
          fields: newFields,
        };
      }
      return sec;
    });
    setsections(newSections);
  };

  const onRemoveField = (field) => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        const newFields = sec.fields.filter((fld) => fld._id !== field._id);
        return {
          ...sec,
          fields: newFields,
        };
      }
      return sec;
    });

    const isConfirm = confirm("Are you sure you want to delete this field?");
    if (isConfirm) {
      setsections(newSections);
    }
  };

  const onRemove = () => {
    const newSections = sections.filter((sec) => sec._id !== section._id);

    const isConfirm = confirm("Are you sure you want to delete this section?");

    if (isConfirm) {
      if (newSections.length > 0) {
        const lastSection = newSections[newSections.length - 1];
        const updatedLastSection = {
          ...lastSection,
          fields: lastSection.fields.map((field) => ({
            ...field,
            validations: field.validations.map((validation) => ({
              ...validation,
              target:
                lastSection && lastSection._id !== section._id
                  ? "Submit"
                  : lastSection._id,
            })),
          })),
        };

        setsections([
          ...newSections.slice(0, newSections.length - 1),
          updatedLastSection,
        ]);
      } else {
        setsections(newSections);
      }
    }
  };

  const onFieldValidationChange = (value, property, field, validationIndex) => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        return {
          ...sec,
          fields: sec.fields.map((fld) => {
            if (fld._id === field._id) {
              const newValidations = fld.validations.map((valid) => {
                if (valid._id === validationIndex) {
                  return {
                    ...valid,
                    [property]: value,
                  };
                }
                return valid;
              });

              return {
                ...fld,
                validations: newValidations,
              };
            }
            return fld;
          }),
        };
      }
      return sec;
    });

    setsections(newSections);
  };

  const addNewValidation = (field) => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        return {
          ...sec,
          fields: sec.fields.map((fld) => {
            if (fld._id === field._id) {
              return {
                ...fld,
                validations: [
                  ...fld.validations,
                  {
                    _id: Date.now(),
                    condition: "",
                    target: "",
                  },
                ],
              };
            }
            return fld;
          }),
        };
      }
      return sec;
    });

    setsections(newSections);
  };

  const onRemoveValidation = (field, validationIndex) => {
    const newSections = sections.map((sec) => {
      if (section._id === sec._id) {
        return {
          ...sec,
          fields: sec.fields.map((fld) => {
            if (fld._id === field._id) {
              return {
                ...fld,
                validations: fld.validations.filter(
                  (valid) => valid._id !== validationIndex
                ),
              };
            }
            return fld;
          }),
        };
      }
      return sec;
    });

    setsections(newSections);
  };

  return (
    <div className={styles.formFieldContainer}>
      <div>
        {section.fields !== undefined &&
          !hideSection &&
          section.fields.map((field) => (
            <div key={field._id} ref={scrollRef}>
              <FormField
                field={field}
                section={section}
                lastField={section.fields[section.fields.length - 1]}
                sections={sections}
                setformFields={() => {
                  onUpdateField(field);
                }}
                onRemoveField={() => {
                  onRemoveField(field);
                }}
                onFieldValidationChange={onFieldValidationChange}
                addNewValidation={() => addNewValidation(field)}
                onRemoveValidation={onRemoveValidation}
              />
            </div>
          ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: "15%",
            borderRadius: "30px",
          }}
          onClick={() => {
            onAddField();
            sethideSection(false);
          }}
        >
          Add Field
        </Button>
        {sections.length > 1 && (
          <MdDelete
            size={20}
            onClick={onRemove}
            style={{backgroundColor: "var(--primary)", 
              WebkitBackgroundClip: "text", 
              color: "transparent", cursor: "pointer", margin: "auto .7em" }}
          />
        )}
        <p
          style={{
            color: "#fff",
            opacity: "0.4",
            fontSize: "11px",
            fontStyle: "italic",
            marginLeft: sections.length > 1 ? 0 : "8px",
          }}
        >
          Section_{section._id} ({section.fields.length} fields)
        </p>

        {hideSection ? (
          <FaAngleDown
            onClick={() => sethideSection(!hideSection)}
            color="gray"
            size={24}
            style={{ cursor: "pointer", margin: "auto 0 auto auto" }}
          />
        ) : (
          <FaAngleUp
            size={24}
            onClick={() => sethideSection(!hideSection)}
            color="gray"
            style={{ cursor: "pointer", margin: "auto 0 auto auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default Section;
