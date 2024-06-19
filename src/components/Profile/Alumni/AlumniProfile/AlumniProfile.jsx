import { useEffect, useState } from "react";
import styles from "./styles/AlumniProfile.module.scss";
import { useContext } from "react";
import AuthContext from "../../../../store/AuthContext";

const AlumniProfile = () => {

  const authCtx = useContext(AuthContext);


  console.log("User data:", authCtx.user);
  // useEffect(() => {
  //   // Fetch data from backend
  //   fetchData()
  //     .then((response) => setData(response))
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);


  // const fetchData = async () => {
  //   // Replace this with actual fetch logic to your backend
  //   // For example:
  //   // const response = await fetch('your-backend-api-url');
  //   // const data = await response.json();
  //   // return data;
  // };

  return (

    <div id={styles.profile}>
        <div className={styles.proHeading}>
          <h3 className={styles.headInnerText}><span>Profile</span> Details</h3>
        </div>
      {authCtx.user && (
      <div className={styles.details}>
        <table className={styles.profileTable}>
          <tbody>
            <tr>
              <td className={styles.dets}>Full Name</td>
              <td className={styles.vals}>{authCtx.user.name}</td>
            </tr>
            <tr>
              <td className={styles.dets}>Roll Number</td>
              <td className={styles.vals}>{authCtx.user.rollNo}</td>
            </tr>
            <tr>
              <td className={styles.dets}>Email ID</td>
              <td className={styles.vals}>{authCtx.user.email}</td>
            </tr>
            <tr>
              <td className={styles.dets}>Year</td>
              <td className={styles.vals}>{authCtx.user.year}</td>
            </tr>
            <tr>
              <td className={styles.dets}>School</td>
              <td className={styles.vals}>{authCtx.user.school}</td>
            </tr>
            <tr>
              <td className={styles.dets}>College</td>
              <td className={styles.vals}>{authCtx.user.college}</td>
            </tr>
            <tr>
              <td className={styles.dets}>Mobile No</td>
              <td className={styles.vals}>{authCtx.user.mobileNo}</td>
            </tr>
          </tbody>
        </table>
      </div>
       )}
    </div>

  );
};

export default AlumniProfile;
