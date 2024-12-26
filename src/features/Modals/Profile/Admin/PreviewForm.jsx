import { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles/Preview.module.scss";
import AuthContext from "../../../../context/AuthContext";
import { Button, Text } from "../../../../components";
import Section from "./SectionModal";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { getOutboundList } from "../../../../sections/Profile/Admin/Form/NewForm/NewForm";
import Complete from "../../../../assets/images/Complete.svg";
import { api } from "../../../../services";
import {
  Alert,
  MicroLoading,
  ComponentLoading,
} from "../../../../microInteraction";
// import AuthContext from "../../../../context/AuthContext";
import { RecoveryContext } from "../../../../context/RecoveryContext";
// import paymentImage from "https://cdn.prod.website-files.com/645fbc01f38b6fb6255c240c/676db4b779d9f41ff8df3875_bank-card-mobile-phone-online-payment_107791-16646-removebg-preview.png"; 

const operators = [
  { label: "match", value: "===" },
  { label: "match not", value: "!==" },
  { label: "less than", value: "<" },
  { label: "greater than", value: ">" },
  { label: "less than or equal to", value: "<=" },
  { label: "greater than or equal to", value: ">=" },
];
const hasOptions = ["select", "checkbox", "radio"];

const PreviewForm = ({
  isEditing,
  eventData,
  form,
  sections = [],
  open,
  meta = [],
  handleClose,
  showCloseBtn,
  eventId
}) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [data, setdata] = useState(sections);
  const [activeSection, setactiveSection] = useState(
    data !== undefined ? data[0] : ""
  );
  const [isCompleted, setisCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMicroLoading, setIsMicroLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alert, setAlert] = useState(null);
  const wrapperRef = useRef(null);
  const recoveryCtx = useContext(RecoveryContext);
  const { setTeamCode, setTeamName, setSuccessMessage } = recoveryCtx;
  const [formData, setFormData] = useState(eventData);
  const [code, setcode] = useState(null);
  const [team, setTeam] = useState(null);
  const [message, setMessage] = useState(null);
  console.log('Data', eventId);
  
  let currentSection =
    data !== undefined
      ? data.find((section) => section._id === activeSection._id)
      : null;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [open]);

  useEffect(() => {
    constructSections();
  }, [sections]);

  useEffect(() => {
    if (alert) {
      const { type, message, position, duration } = alert;
      Alert({ type, message, position, duration });
      setAlert(null); // Reset alert after displaying it
    }
  }, [alert]);

  const constructSections = () => {
    const newSections = data.map((section) => {
      return {
        ...section,
        isDisabled: section._id !== data[0]._id,
        fields: section.fields.map((field) => {
          return {
            ...field,
            onChangeValue: "",
          };
        }),
      };
    });
    setdata(newSections);
    setactiveSection(newSections[0]);
  };

  const handleChange = (field, value) => {
    const updatedSections = data.map((section) => {
      const updatedFields = section.fields.map((fld) => {
        if (field._id === fld._id) {
          if (fld.type === "checkbox") {
            const updatedOnChangeValue = fld.onChangeValue.includes(value)
              ? fld.onChangeValue.filter((val) => val !== value)
              : [...fld.onChangeValue, value];

            return {
              ...fld,
              onChangeValue: updatedOnChangeValue,
            };
          } else {
            return {
              ...fld,
              onChangeValue: value,
            };
          }
        }
        return fld;
      });

      return {
        ...section,
        fields: updatedFields,
      };
    });

    const newSections = updatedSections.map((section) => {
      const isHavingFieldValidations = section?.validations?.filter(
        (valid) => valid.field_id
      );

      let isMatched = false;
      if (isHavingFieldValidations.length > 0) {
        isMatched = isHavingFieldValidations.some((valid) => {
          return section.fields.some((fld) => {
            return fld.onChangeValue === valid.values;
          });
        });
      }

      const nextSection = getOutboundList(data, section._id)?.nextSection;

      return {
        ...section,
        isDisabled: !(isMatched && nextSection),
      };
    });

    setdata(newSections);
  };

  useEffect(() => {
    if (isSuccess) {
      const participationType = eventData?.participationType;
      const successMessage = eventData?.successMessage;
      console.log(participationType);
      const handleAutoClose = () => {
        setTimeout(() => {
          if (participationType === "Team") {
            setTeamCode(code);
            setTeamName(team);
          }
          if (successMessage){
            setSuccessMessage(successMessage);
          }
          navigate("/Events");
        }, 1000);
      };

      handleAutoClose();
    }
  }, [isSuccess, navigate]);

  const areRequiredFieldsFilled = () => {
    let isFilled = {
      status: true,
    };

    if (currentSection) {
      currentSection.fields.forEach((field) => {
        if (field.isRequired && !field.onChangeValue) {
          setAlert({
            type: "error",
            message: "Please fill all the details",
            position: "bottom-right",
            duration: 3000,
          });
          isFilled = {
            status: false,
          };
          return;
        }

        field.validations.forEach((valid) => {
          if (valid.type === "length") {
            if (!matchCondition(field, valid)) {
              const op = operators.find((op) => op.value === valid.operator);
              setAlert({
                type: "error",
                message: `${field.name} should ${op?.label} ${valid.type} ${valid.value}`,
                position: "bottom-right",
                duration: 3000,
              });
              isFilled = {
                status: false,
              };
            }
          }
        });
      });
    }

    if (!isFilled.status) {
      return false;
    }

    return true;
  };

  const matchCondition = (field, valid) => {
    const fieldLength = hasOptions.includes(field.type)
      ? field.type === "checkbox"
        ? field.onChangeValue.length
        : field.onChangeValue.split(",").length
      : field.onChangeValue.length;

    const operator = valid?.operator;
    const validLength =
      valid.type === "length" ? Number(valid?.value) : valid?.value;

    switch (operator) {
      case "===":
        return fieldLength === validLength;
      case "!==":
        return fieldLength !== validLength;
      case "includes":
        return field.onChangeValue?.includes(valid?.value);
      case "!includes":
        return !field.onChangeValue?.includes(valid.value);
      case "<":
        return fieldLength < validLength;
      case ">":
        return fieldLength > validLength;
      case "<=":
        return fieldLength <= validLength;
      case ">=":
        return fieldLength >= validLength;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  };

  const isMetaExist = () => {
    if (meta?.length === 0) return null;
    const paymentSection = meta.find((sec) => sec?.name === "Payment Details");
    if (paymentSection) {
      paymentSection.isDisabled = false;
      paymentSection.validations[0].onBack = currentSection._id;
      return paymentSection;
    }
  };

  const inboundList = () => {
    if (!currentSection) return null;
    let nextSection = currentSection?.validations[0]?.onNext;
    let backSection = currentSection.validations[0]?.onBack;
    const isHavingFieldValidations = currentSection?.validations?.filter(
      (valid) => valid.field_id
    );

    if (isHavingFieldValidations.length > 0) {
      const isMatched = isHavingFieldValidations.find((valid) => {
        return currentSection.fields?.find((fld) => {
          return fld?.onChangeValue?.trim() === valid?.values?.trim();
        });
      });
      nextSection = isMatched ? isMatched?.onNext : nextSection;
      backSection = isMatched ? isMatched?.onBack : backSection;
    }

    if (isMetaExist() && currentSection?.name === "Payment Details") {
      const lastIsCompleted = isCompleted[isCompleted.length - 1];
      backSection = lastIsCompleted;
    }

    return {
      nextSection: data.find((sec) => sec._id === nextSection) || null,
      backSection: data.find((sec) => sec._id === backSection) || null,
    };
  };

  const constructToSave = () => {
    const newSections = [...data, ...meta];
    return newSections.map((section) => {
      if (
        (section !== null && isCompleted.includes(section._id)) ||
        (section !== null && currentSection._id === section._id)
      ) {
        return {
          _id: section._id,
          name: section.name,
          fields: section.fields.map((field) => {
            return {
              _id: field._id,
              name: field.name,
              type: field.type,
              value: field.onChangeValue,
            };
          }),
        };
      }
    });
  };

  const filterMediaFields = () => {
    return (
      data
        .filter(
          (section) =>
            currentSection._id === section._id ||
            isCompleted.includes(section._id)
        )
        .map((section) =>
          section.fields.filter(
            (field) => field.type === "file" || field.type === "image"
          )
        )
        .flat() || []
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const mediaFields = filterMediaFields() || [];
    const isCreateTeam = data.some(
      (sec) =>
        (sec.name === "Create Team" && currentSection._id === sec._id) ||
        (sec.name === "Create Team" && isCompleted.includes(sec._id))
    );
    const isJoinTeam = data.some(
      (sec) =>
        (sec.name === "Join Team" && currentSection._id === sec._id) ||
        (sec.name === "Join Team" && isCompleted.includes(sec._id))
    );

    formData.append("_id", form.id);
    formData.append("sections", JSON.stringify(constructToSave()));
    formData.append("createTeam", isCreateTeam);
    formData.append("joinTeam", isJoinTeam);

    mediaFields.forEach((field) => {
      if (field.onChangeValue) {
        formData.append(field.name, field.onChangeValue);
      }
    });

    try {
      setIsLoading(true);
      setIsMicroLoading(true);

      if (isEditing) {
        setIsSuccess(true);
        return;
      }

      const response = await api.post("/api/form/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const updatedRegForm = [...authCtx.user.regForm, form.id];
        authCtx.update(
          authCtx.user.name,
          authCtx.user.email,
          authCtx.user.img,
          authCtx.user.rollNumber,
          authCtx.user.school,
          authCtx.user.college,
          authCtx.user.contactNo,
          authCtx.user.year,
          authCtx.user.github,
          authCtx.user.linkedin,
          authCtx.user.extra.designation,
          authCtx.user.access,
          authCtx.user.editProfileCount,
          updatedRegForm // Pass the updated regForm
        );
        setAlert({
          type: "success",
          message: "Form submitted successfully!",
          position: "bottom-right",
          duration: 3000,
        });
        if (response.data) {
          const { teamName, teamCode } = response.data;
   
          const participationType = eventData?.participationType;
          const successMessage = eventData?.successMessage;
          if (participationType === "Team") {
            setTeam(teamName);
            setcode(teamCode);
            // console.log("saved context teamCode:",recoveryCtx.teamCode)
          }
          if (successMessage){
            setMessage(successMessage);
          }
          // console.log("consoling teamdata:", teamName, teamCode);
        }
        setIsSuccess(true);
      } else {
        setAlert({
          type: "error",
          message:
            response.data.message ||
            "There was an error submitting the form. Please try again.",
          position: "bottom-right",
          duration: 3000,
        });
        setIsSuccess(false);
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setAlert({
        type: "error",
        message:
          error?.response?.data?.message ||
          "There was an error submitting the form. Please try again.",
        position: "bottom-right",
        duration: 3000,
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setIsMicroLoading(false);
    }
  };

  const onNext = () => {
    if (!currentSection) {
      return false;
    }

    if (!areRequiredFieldsFilled()) {
      return false;
    }

    const { nextSection } = inboundList();

    if (nextSection) {
      setisCompleted((prev) => [...prev, currentSection._id]);
      setactiveSection(nextSection);
    }

    if (!nextSection || nextSection === "submit") {
      setisCompleted((prev) => [...prev, currentSection._id, "Submitted"]);
      return handleSubmit();
    }
  };

  const onBack = () => {
    const { backSection } = inboundList();
    if (backSection) {
      setisCompleted((prev) => prev.filter((id) => id !== backSection._id));
      setactiveSection(backSection);
    }
  };

  const handlePayment = async (e) => {
    if (!areRequiredFieldsFilled()) {
      return false;
    }
    setIsLoading(true);
    setIsMicroLoading(true);
    // console.log(typeof(eventAmount)); 
    const { eventAmount } = formData;
    
    try {
      const response = await api.post("/api/form/initiatePayment", {
        eventId: eventId,
        amount: eventAmount,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        const orderId  = response.data.orderId;
        console.log(orderId);
        
        // Start Razorpay checkout
        const options = {
          key: "rzp_test_ChH0b4D5LwCIsA", // Public Razorpay key
          amount: eventAmount * 100,
          currency: "INR",
          name: "Fed KIIT",
          description: eventData?.eventTitle,
          image:eventData?.eventImg,
          order_id: orderId,
          handler: async function (response) {
            try {
            const body = {
              ...response,
            };
             console.log("body", body);
    
            const validateRes = await api.post(
              "/api/form/validatePayment",
              body,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
              }
            );
            if (validateRes.data.msg === "success") {
              // setIsPaymentSuccess(true);
              handleSubmit(); // Automatically submit the form upon success
            } else {
              throw new Error("Payment validation failed");
            }
          } catch (error) {
            
            console.error("Payment validation error:", error);
            alert("Payment validation failed. You can continue filling the form.");
          }
         
          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            name: authCtx.user.name, //your customer's name
            email: authCtx?.user?.email,
            contact: authCtx?.user?.contactNo, //Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
        razorpay.on("payment.failed", function (response) {
          alert(`Payment failed: ${response.error.description}`);
        })
   
        
      } else {
        setAlert({
          type: "error",
          message:
            response.data.message ||
            "There was an error initiating the payment. Please try again.",
          position: "bottom-right",
          duration: 3000,
        });
        setIsSuccess(false);
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setAlert({
        type: "error",
        message:
          error?.response?.data?.message ||
          "There was an error initiating the payment. Please try again.",
        position: "bottom-right",
        duration: 3000,
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setIsMicroLoading(false);
    }
  };
  

  const renderPaymentScreen = () => {
    if (formData.eventType === "Paid" && currentSection.name === "Payment Details") {
      return (
        <div
          style={{
            margin: "8px auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <img style={{height :"10rem",width:"auto"}} src="https://cdn.prod.website-files.com/645fbc01f38b6fb6255c240c/676db4b779d9f41ff8df3875_bank-card-mobile-phone-online-payment_107791-16646-removebg-preview.png"></img>
        </div>
      );
    }
  };    
  

  return (
    <>
      open && (
      <div className={styles.mainPreview}>
        <div className={styles.previewContainerWrapper}>
          <div ref={wrapperRef} className={styles.previewContainer}>
            {showCloseBtn &&
              (isEditing ? (
                <div onClick={handleClose} className={styles.closeBtn}>
                  <X />
                </div>
              ) : (
                <Link to="/Events" onClick={handleClose}>
                  <div className={styles.closeBtn}>
                    <X />
                  </div>
                </Link>
              ))}
            <Text
              style={{
                marginBottom: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              {eventData?.eventTitle || "Preview Event"}
            </Text>
            {isLoading ? (
              <ComponentLoading
                customStyles={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "0rem",
                  marginTop: "5rem",
                }}
              />
            ) : !isCompleted.includes("Submitted") ? (
              <div style={{ width: "100%" }}>
                <div>
                  <Text style={{ alignSelf: "center" }} variant="secondary">
                    {currentSection.name}
                  </Text>
                  <Text
                    style={{
                      cursor: "pointer",
                      padding: "6px 0",
                      fontSize: "11px",
                      opacity: "0.4",
                      marginBottom: "8px",
                    }}
                  >
                    {currentSection.description}
                  </Text>
                </div>
                {renderPaymentScreen()}
                <Section section={currentSection} handleChange={handleChange} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {inboundList() && inboundList().backSection && (
                    <Button style={{ marginRight: "10px" }} onClick={onBack}>
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={

                      inboundList() && inboundList().nextSection
                        ? onNext
                        : (formData.eventType === "Paid" && currentSection.name === "Payment Details")?handlePayment:handleSubmit
                    }
                  >
                    {inboundList() && inboundList().nextSection ? (
                      "Next"
                    ) : isMicroLoading ? (
                      <MicroLoading />
                    ) : (
                      
                      (formData.eventType === "Paid" && currentSection.name === "Payment Details")?"Pay Now":"Submit"
                     
                    )}
                  </Button>
                </div>
              </div>
            ) : isSuccess ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <img
                  src={Complete}
                  alt="Complete"
                  style={{ width: "400px", height: "400px", margin: "auto" }}
                />
                <Text
                  variant="secondary"
                  style={{
                    width: "60%",
                    fontSize: "14px",
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: "16px",
                    userSelect: "none",
                  }}
                >
                  Form Submitted Successfully! Thank you for your time.
                </Text>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Text
                  variant="secondary"
                  style={{
                    width: "60%",
                    fontSize: "14px",
                    alignSelf: "center",
                    textAlign: "center",
                    marginTop: "16px",
                    userSelect: "none",
                  }}
                >
                  <h2 style={{ marginBottom: "3rem" }}>
                    Error Submitting your Form
                  </h2>
                  There is an error submitting the form. If you have made any
                  payment, please fill up your payment details again. There is
                  no need to pay again.
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
      )
      <Alert />
    </>
  );
};
export default PreviewForm;
