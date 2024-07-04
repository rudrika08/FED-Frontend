import { useState, useEffect } from "react";
import styles from "./styles/Alumni.module.scss";
import alumniData from "../../data/AlumniCard.json";
import { TeamCard } from "../../components";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}

const AlumniSection = ({ alumni }) => {
  const windowWidth = useWindowWidth();
  const membersPerRow = windowWidth < 500 ? 2 : 4;
  const remainderMembersCount = alumni.length % membersPerRow;
  const lastRowMembers = remainderMembersCount > 0 ? alumni.slice(-remainderMembersCount) : [];
  const otherMembers = remainderMembersCount > 0 ? alumni.slice(0, -remainderMembersCount) : alumni;

  return (
    <div className={styles.alumniSection}>
      <div className={styles.alumniGrid}>
        {otherMembers.map((each, idx) => (
          <TeamCard
            key={idx}
            name={each.name}
            image={each.image}
            social={each.social}
          />
        ))}
      </div>

      {lastRowMembers.length > 0 && (
        <div className={styles.lastRowCentered}>
          {lastRowMembers.map((member, idx) => (
            <TeamCard
              key={idx}
              name={member.name}
              image={member.image}
              social={member.social}
            />
          ))}
        </div>
      )}
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
        Meet Our <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>Alumni</span>
      </h2>
      <div className={styles.circle}></div>

      <AlumniSection alumni={alumniData} />

      <div className={styles.circle2}></div>
    </div>
  );
};

export default Alumni;
