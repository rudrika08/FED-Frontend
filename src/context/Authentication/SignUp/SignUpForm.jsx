import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./style/Signup.module.scss";
import GoogleSignup from "./GoogleSignup";
import Or from "./Or";

function SignUpForm() {
  const [selected, setSelected] = useState("");
  const [DropShow, hideDrop] = useState(false);
  const containerRef = useRef(null);
  const [showUser, setUser] = useState({
    email: "",
    Password: "",
    FirstName: "",
    LastName: "",
    RollNumber: "",
    School: "",
    College: "",
    MobileNo: "+91",
    tandC: false,
  });

  const options = [
    { value: "1st", text: "1st year" },
    { value: "2nd", text: "2nd year" },
    { value: "3rd", text: "3rd year" },
    { value: "4th", text: "4th year" },
    { value: "5th", text: "5th year" },
  ];

  let menu = useRef();

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const DataInp = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...showUser, [name]: value }); // Update the state

    if (name === "email") {
      if (value === "") {
        e.target.style.border = "1px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.border = "1px solid  #FFF";
      }
      if (value.indexOf("@") === -1 || value.indexOf(".") === -1) {
        e.target.style.border = "1px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.borderBottom = "1px solid  #FFF";
      }
    }

    if(name==="FirstName"||name==="LastName"||name==="School"||name==="RollNumber"||name==="Password"){
      if (value === "") {
        e.target.style.border = "1px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.border = "1px solid  #FFF";
      }
    }

    if (name === "MobileNo") {
      if (value.length === 10) {
        containerRef.current.style.border = "1px solid #FFF";
      } else {
        containerRef.current.style.border = "1px solid #FF0000";
      }
    }

    if (name === "College") {
      if (
        "Kalinga Institute of Industrial Technology"
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        hideDrop(true);
      } else {
        hideDrop(false);
      }

      if (value === "") {
        hideDrop(false);
        e.target.style.border = "1px solid  #FF0000";
        e.target.style.outline = "none";
      } else {
        e.target.style.border = "1px solid  black";
      }
    }
  };

  useEffect(() => {
    if (DropShow) {
      document.addEventListener("mousedown", handler);
    }
  }, [DropShow]);

  const handler = (e) => {
    try {
      if (!menu.current.contains(e.target)) {
        hideDrop(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DropCheck = () => {
    if (
      "Kalinga Institute of Industrial Technology"
        .toLowerCase()
        .includes(showUser.College.toLowerCase())
    ) {
      hideDrop(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(showUser); // You can replace this with an API call or other logic
  };

  return (
    <>
      <GoogleSignup />
      <Or />

      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className={style.nameInpDiv}>
            <input
              id="first_name"
              type="text"
              name="FirstName"
              placeholder="First Name"
              className={style.inpNameTag}
              onChange={DataInp}
              required
            />
            <input
              type="text"
              id="last_name"
              name="LastName"
              placeholder="Last Name"
              className={style.inpNameTag}
              onChange={DataInp}
              required
            />
          </div>

          <div className={style.nameInpDiv}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.inpNameTag}
              onChange={DataInp}
              required
            />

            {/* Phone Number */}
            <div className={style.mobileno_container} ref={containerRef}>
              <p className={style.mobileno91}>+91</p>
              <input
                type="number"
                id="number"
                name="MobileNo"
                placeholder="Mobile Number"
                className={style.inputNoTag}
                onChange={DataInp}
                required
              />
            </div>
          </div>

          {/* College */}
          <div ref={menu} className={style.CollegeInpmDIv}>
            <input
              type="text"
              id="college"
              name="College"
              placeholder="College"
              className={style.inpNameTag}
              value={showUser.College}
              onChange={DataInp}
              onFocus={() => {
                DropCheck();
              }}
              spellCheck="true"
              autoComplete="off"
              required
            />

            <div
              className={style.DropDownmDiv}
              style={{ display: DropShow ? "block" : "none" }}
              onClick={() => {
                setUser({
                  ...showUser,
                  College: "Kalinga Institute of Industrial Technology",
                });
                hideDrop(false);
              }}
            >
              Kalinga Institute of Industrial Technology
            </div>
          </div>

          {/* School */}
          <input
            type="text"
            id="school"
            name="School"
            placeholder="School"
            className={style.inpSchoolTag}
            onChange={DataInp}
            required
          />

          {/* Roll Number */}
          <input
            type="text"
            id="rollNum"
            name="RollNumber"
            placeholder="Roll Number"
            className={style.inpYearTag}
            onChange={DataInp}
            required
          />

          {/* Year */}
          <select
            value={selected}
            onChange={handleChange}
            required
            className={style.year}
          >
            <option hidden> Year</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>

          {/* Password */}
          <input
            type="password"
            id="password"
            name="Password"
            placeholder="Password"
            className={style.inpYearTag}
            onChange={DataInp}
            required
          />

          <button type="submit" className={style.btn}>
            SignUp
          </button>
        </form>

        <p className={style.member}>
          Already a member?{" "}
          <Link to="/" className="LinkStyle">
            <span className={style.spn}>Login</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignUpForm;
