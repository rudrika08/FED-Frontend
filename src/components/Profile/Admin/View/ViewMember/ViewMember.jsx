import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/ViewMember.module.scss";
import Button from "../../../../../components/Core/Button";
import AddMemberForm from "../../Form/MemberForm/AddMemberForm";
import MemberCard from "../../../../TeamCard/TeamCard";
import teamMembers from "../../../../../data/MemberCard.json";

function ViewMember() {
  const [memberActivePage, setMemberActivePage] = useState("Alumini");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch member data using axios
    const fetchMemberData = async () => {
      try {
        const response = await axios.get("/api/user/fetchTeam");
        const fetchedMembers = response.data;
        const testMembers = teamMembers;
        setMembers(fetchedMembers.length > 0 ? fetchedMembers : testMembers);
      } catch (error) {
        console.error("Error fetching member data:", error);
        setMembers(teamMembers); // Fallback to test data
      }
    };

    fetchMemberData();
  }, []);

  const headerMenu = [
    "Alumini",
    "Technical",
    "Creative",
    "Marketing",
    "Sponsorship & PR",
    "Operations",
    "Directors",
    "Add Member",
  ];

  const renderButtons = () =>
    headerMenu.map((menu) => (
      <Button
        key={menu}
        className={styles.buttonMember}
        variant={menu === memberActivePage ? "primary" : "secondary"}
        onClick={() => setMemberActivePage(menu)}
        style={{
          borderRadius: menu !== "Add Member" ? "20px" : "4px",
          marginLeft: menu === "Add Member" ? "20px" : "0px",
        }}
      >
        {menu}
      </Button>
    ));

  const getMembersByPage = () => {
    if (memberActivePage === "Add Member") return null;
    return members.filter(
      (member) =>
        member.role.toLowerCase() === memberActivePage.toLowerCase()
    );
  };

  const membersToDisplay = getMembersByPage();

  return (
    <div className={styles.mainMember}>
      <div className={styles.eventmember}>
        <div className={styles.right}>
          <div className={styles.buttons}>{renderButtons()}</div>
          {memberActivePage === "Add Member" ? (
            <AddMemberForm />
          ) : (
            <div className={styles.teamGrid}>
              {membersToDisplay.map((member, idx) => (
                <MemberCard
                  key={idx}
                  name={member.name}
                  image={member.image}
                  social={member.social}
                  title={member.title}
                  role={member.role}
                  know={member.know}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMember;
