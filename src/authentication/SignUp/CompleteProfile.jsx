import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/Core/Input";
import Button from "../../components/Core/Button";
import Load from "../../microInteraction/Load/Load";
import axios from "axios";
import CPCss from "./style/CompleteProfile.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AuthContext from "../../context/AuthContext";

function CompleteProfile() {
  const [loadingEffect, setLoad] = useState(false);
  const [year, setYear] = useState("");
  const [showUser, setUser] = useState({
    email: "",
    name: "",
    RollNumber: "",
    School: "",
    College: "",
    MobileNo: "",
    img: "",
    year: "",
  });

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const userData = location.state?.data || {}; 
  const { name = "", email = "", picture: img = "" } = userData;

  const DataInp = (name, value) => {
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const options = [
    { value: "1st", text: "1st year" },
    { value: "2nd", text: "2nd year" },
    { value: "3rd", text: "3rd year" },
    { value: "4th", text: "4th year" },
    { value: "5th", text: "5th year" },
    { value: "Passout", text: "Passout" },
  ];

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    setLoad(true);

    const { RollNumber, School, College, MobileNo } = showUser;

    const userObject = {
      name,
      email,
      img,
      RollNumber,
      School,
      College,
      MobileNo,
      year,
    };
    console.log(userObject);

    try {
      //  API call
      // const response = await axios.post(`/auth/googleregister`, userObject);
      // if (response.data.status === true) {
      //   authCtx.login(
      //     response.data.user.name,
      //     response.data.user.email,
      //     response.data.user.img,
      //     response.data.user.RollNumber,
      //     response.data.user.School,
      //     response.data.user.College,
      //     response.data.user.MobileNo,
      //     response.data.user.selected,
      //     response.data.user.regForm,
      //     Number(response.data.user.access),
      //     response.data.token,
      //     10800000
      //   );

      // userObject for demonstration
      authCtx.login(
        userObject.name,
        userObject.email,
        userObject.img,
        userObject.RollNumber,
        userObject.School,
        userObject.College,
        userObject.MobileNo,
        userObject.year,
        "someRegForm",
        "user",
        "someToken",
        7200000
      );

      console.log("Profile created successfully");
      alert("Profile created successfully");
      navigate("/profile");  // Navigate to MyProfile after successful registration
      
    } catch (error) {
      console.error("Error during profile creation:", error);
      alert("An error occurred while creating your profile. Please try again.");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className={CPCss.mDiv}>
      <div className={CPCss.mDivCon}>
        <div className={CPCss.ArrowBackIcon} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>
        <div className={CPCss.BackGround}>
          <div>
            <p className={CPCss.CreateProfile}>Create Profile</p>
            <p className={CPCss.Please}>Please enter Your Details</p>
          </div>

          <form className={CPCss.FormTag} onSubmit={handleCreateProfile}>
            <Input
              type="select"
              placeholder="College Name"
              label="College"
              name="College"
              options={[
                {
                  label: "Kalinga Institute of Industrial Technology",
                  value: "Kalinga Institute of Industrial Technology",
                },
              ]}
              value={showUser.College}
              onChange={(value) => DataInp("College", value)}
              required
              style={{ width: "96%" }}
            />

            <Input
              type="text"
              placeholder="Roll Number"
              label="Roll Number"
              name="RollNumber"
              onChange={(e) => DataInp(e.target.name, e.target.value)}
              required
              style={{ width: "100%" }}
            />

            <Input
              type="text"
              placeholder="School"
              label="School"
              name="School"
              onChange={(e) => DataInp(e.target.name, e.target.value)}
              required
              style={{ width: "100%" }}
            />

            <Input
              type="text"
              placeholder="1234567890"
              label="Mobile"
              name="MobileNo"
              onChange={(e) => DataInp(e.target.name, e.target.value)}
              required
              style={{ width: "100%" }}
            />

            <div>
              <label style={{ marginLeft: "2%" }} htmlFor="year">
                Year
              </label>
              <select
                value={year}
                name="year"
                onChange={handleChange}
                className={CPCss.year}
              >
                <option hidden>Year</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginLeft: "8px" }}>
              <Button
                style={{
                  width: "102%",
                  backgroundColor: "#ff6b00",
                  color: "#fff",
                  height: "40px",
                  marginTop: "20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  border: "1px solid #fff",
                }}
                type="submit"
                onClick={handleCreateProfile}
              >
                {loadingEffect ? <Load /> : "Create Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

CompleteProfile.propTypes = {
  data: PropTypes.object,
  set: PropTypes.func,
};

export default CompleteProfile;
