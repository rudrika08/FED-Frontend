import { useState } from "react";
import styles from "./styles/ViewMember.module.scss";
import Button from "../../../../Core/Button";

import AddMemberForm from "../../Form/MemberForm/AddMemberForm";
import MemberCard from "../../../../Team/Member/MemberCard";

import { View } from "lucide-react";

function ViewMember() {
  const [activePage, setActivePage] = useState("Alumini");

  const headerMenu = [
    "Alumini",
    "Techinal",
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
        variant={menu === activePage ? "primary" : "secondary"}
        onClick={() => setActivePage(menu)}
        style={{
          borderRadius: menu !== "Add Member" ? "20px" : "4px",
          marginLeft: menu === "Add Member" ? "20px" : "0px",
        }}
      >
        {menu}
      </Button>
    ));

  return (
    <div className={styles.mainMember}>
      <div className={styles.eventmember}>
        <div className={styles.right}>
          <div className={styles.buttons}>
            {renderButtons()}
          </div>
          {activePage === "Add Member" ? <AddMemberForm /> : <MemberCard />}
        </div>
      </div>
    </div>
  );
}

export default ViewMember;
