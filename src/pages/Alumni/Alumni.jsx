import React, { useEffect } from "react";
import styles from "./styles/Alumni.module.scss"; // Adjust the path to your styles
import alumniData from "../../data/AlumniCard.json"; // Import the JSON data
import AlumniCard from "../../components/Team/Alumni/AlumniCard";

const AlumniSection = ({ alumni }) => {
  return (
    <div className={styles["alumni-section"]}>
      <div className={styles["alumni-grid"]}>
        {alumni.map((each, idx) => (
          <AlumniCard
            key={idx}
            name={each.name}
            image={each.image}
            social={each.social}
          />
        ))}
      </div>
    </div>
  );
};

const Alumni = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.Alumni}>
      <h2>
        Meet Our <span>Alumni</span>
      </h2>
      <div className={styles.circle}></div>

      <AlumniSection alumni={alumniData} />

      <div className={styles.circle2}></div>
    </div>
  );
};

export default Alumni;
