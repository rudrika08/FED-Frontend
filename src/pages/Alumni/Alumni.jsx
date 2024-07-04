import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Alumni.module.scss";
import { TeamCard } from "../../components";
import useWindowWidth from "../../hooks/useWindowWidth"; // Import useWindowWidth hook
import AlumniData from "../../data/Alumni.json"; // Local fallback data

const Alumni = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        // const response = await axios.get('/api/user/fetchAlumni');
        // setAlumni(response.data);

        setAlumni(AlumniData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alumni members:', error);
        setAlumni(AlumniData);
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

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

  return (
    <div className={styles.Alumni}>
      <h2>
        Meet Our <span style={{ background: "var(--primary)", WebkitBackgroundClip: "text", color: "transparent" }}>Alumni</span>
      </h2>
      <div className={styles.circle}></div>

      {!loading && <AlumniSection alumni={alumni} />}

      <div className={styles.circle2}></div>
    </div>
  );
};

export default Alumni;
