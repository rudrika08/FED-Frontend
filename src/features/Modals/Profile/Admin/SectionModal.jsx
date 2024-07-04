import { Input } from "../../../../components";
import styles from "./styles/Preview.module.scss";

const Section = ({ section, handleChange }) => {
  const getInputFields = (field) => {
    const valiedTypes = ["checkbox", "radio"];
    if (valiedTypes.includes(field.type)) {
      const valueToArray = field.value.split(",");
      return valueToArray.map((value, index) => (
        <div
          key={index}
          style={{
            marginTop: index === 0 ? ".5em" : "0",
          }}
        >
          <Input
            placeholder={value}
            label={value}
            showLabel={false}
            type={field.type}
            value={value}
            name={field.name}
            onChange={(e) => handleChange(field, e.target.value)}
          />
        </div>
      ));
    }
  };
  return (
    <div key={section._id} className={styles.formFieldContainer}>
      {section.fields.length > 0 &&
        section.fields.map(
          (field) =>
            field !== undefined && (
              <div key={field._id}>
                {field.type !== "checkbox" && field.type !== "radio" ? (
                  <Input
                    placeholder={
                      field.type === "select"
                        ? `Choose ${field.name}`
                        : field.value
                    }
                    label={field.name}
                    type={field.type}
                    name={field.name}
                    value={field.onChangeValue}
                    onChange={(e) => {
                      const val = field.type === "select" ? e : e.target.value;
                      handleChange(field, val);
                    }}
                    options={
                      field.type === "select"
                        ? field.value.split(",").map((option) => {
                            return { value: option, label: option };
                          })
                        : []
                    }
                  />
                ) : (
                  <label
                    style={{
                      color: "#fff",
                      fontSize: ".8em",
                    }}
                  >
                    {field.name}
                  </label>
                )}
                {getInputFields(field)}
              </div>
            )
        )}
    </div>
  );
};

export default Section;
