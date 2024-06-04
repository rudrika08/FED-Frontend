import React, { useState } from "react";
import Sidebar from "../../layouts/Sidebar/Sidebar";
import MainForm from "../../components/Form/MainForm";
import MemberPage from "../../components/Member/MemberPage";
import EventPage from "../../components/Event/AddEventForm";
import Layout from "../../layouts/Layout";
import style from "./Styles/profile.module.scss";

const Profile = () => {
  const [activePage, setactivePage] = useState("Event");

  const getActivePage = () => {
    switch (activePage) {
      case "Event":
        return (
          <>
            <EventPage />
          </>
        );

      case "Form":
        return (
          <>
            <MainForm />
          </>
        );

      case "Members":
        return (
          <>
            <MemberPage />
          </>
        );

      default:
        break;
    }
  };

  return (
    <Layout>
      <div className={style.profile}>
        <Sidebar
          activepage={activePage}
          handleChange={(page) => setactivePage(page)}
        />
        <div className={style.profile__content}>{getActivePage()}</div>
      </div>
    </Layout>
  );
};

export default Profile;
