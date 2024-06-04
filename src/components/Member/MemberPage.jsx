import React, { useState } from "react";
import styles from "./styles/members.module.scss";
import Button from "../Core/Button";
import FormPage from "./form";
import MemberCard from "./MemberCard";

const MemberPage = () => {
  const [activePage, setactivePage] = useState("Alumini");

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
  return (
    <div className={styles.mainMember}>
      <div className={styles.eventmember}>
        <div className={styles.right}>
          <div className={styles.buttons}>
            {headerMenu.map((menu) => (
              <Button
                className={styles.buttonMember}
                variant={menu === activePage ? "primary" : "secondary"}
                onClick={() => setactivePage(menu)}
                style={{
                  borderRadius: menu !== "Add Member" ? "20px" : "4px",
                  marginLeft: menu === "Add Member" ? "20px" : "0px",
                }}
              >
                {menu}
              </Button>
            ))}
          </div>
          {activePage === "Add Member" ? <FormPage /> : <MemberCard />}
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
