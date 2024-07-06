import { useEffect, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import styles from "./styles/Form.module.scss";
import Input from "../Core/Input";
import Button from "../Core/Button";

const PopField = ({
  field,
  sections,
  handleClose,
  onFieldValidationChange,
  onAddValidation,
  onRemoveValidation,
}) => {
  const wrapperRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      handleClose();
    }
  };

  const addCondition = () => {
    onAddValidation(field);
    setTimeout(() => {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  return (
    <div className={styles.popField} ref={wrapperRef}>
      {field?.validations?.map((valid, i) => (
        <div key={i} ref={scrollRef} className={styles.popFieldInpt}>
          <Input
            defaultValue={valid.condition}
            name="Condition"
            placeholder="Enter Condition"
            label="Enter Condition"
            className={styles.fieldInput}
            containerClassName={styles.popFieldInptContainer}
            onChange={(e) =>
              onFieldValidationChange(
                e.target.value,
                "condition",
                field,
                valid._id
              )
            }
          />

          <Input
            value={valid.target}
            placeholder="Choose Target"
            label="Target Section"
            name="Target_Section"
            type="select"
            className={styles.fieldInput}
            containerClassName={styles.popFieldInptContainer}
            options={[
              ...sections.map((section) => {
                return {
                  label: `${section.name}_${section._id}`,
                  value: section._id,
                };
              }),
              {
                label: "Submit",
                value: "Submit",
              },
            ]}
            onChange={(value) =>
              onFieldValidationChange(value, "target", field, valid._id)
            }
          />
          {field.type === "checkbox" && field?.validations.length > 1 && (
            <MdOutlineClose
              size={22}
              onClick={() => {
                onRemoveValidation(field, valid._id);
              }}
              color="#FF8A00"
              style={{
                cursor: "pointer",
                marginTop: "12px",
                zIndex: 10,
              }}
            />
          )}
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {field.type === "checkbox" && (
          <Button onClick={addCondition}>Add Condition</Button>
        )}
        <p
          style={{
            color: "#fff",
            opacity: "0.4",
            fontSize: "11px",
            fontStyle: "italic",
            marginRight: "auto",
            marginLeft: sections.length > 1 ? 0 : "8px",
          }}
        >
          Field_{field._id} ({field.validations.length} conditions)
        </p>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
      </div>
    </div>
  );
};

export default PopField;
