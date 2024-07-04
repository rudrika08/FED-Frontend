import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Alumni.module.scss";
import { TeamCard } from "../../components";
import useWindowWidth from "../../hooks/useWindowWidth"; // Import useWindowWidth hook
import MemberData from "../../data/Team.json"; // Local fallback data

const Alumni = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        // const response = await axios.get('/api/user/fetchTeam');
        // setTeamMembers(response.data);
        const testAlumni = MemberData;
        const filteredAlumni = testAlumni.filter(member => member.access === 'ALUMNI');
        setAlumni(filteredAlumni);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alumni members:', error);
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
          {otherMembers.map((member, idx) => (
            <TeamCard
              key={idx}
              name={member.name}
              image={member.img}
              social={member.extra}
              title={member.extra.title}
              role={member.access}
              know={member.extra.know}
            />
          ))}
        </div>

        {lastRowMembers.length > 0 && (
          <div className={styles.lastRowCentered}>
            {lastRowMembers.map((member, idx) => (
              <TeamCard
                key={idx}
                name={member.name}
                image={member.img}
                social={member.extra}
                title={member.extra.title}
                role={member.access}
                know={member.extra.know}
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
