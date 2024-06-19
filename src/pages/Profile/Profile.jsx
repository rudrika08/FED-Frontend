import { useState, useContext, useEffect } from 'react';
import Layout from '../../layouts/Profile/ProfileLayout/ProfileLayout';
import Sidebar from '../../layouts/Profile/Sidebar/Sidebar';
import AuthContext from '../../store/AuthContext';

import {ProfileView, EventsView, NewForm, ViewMember, ViewEvent} from '../../components/Profile';

import style from "./styles/Profile.module.scss";

const Profile = () => {
  const [activePage, setActivePage] = useState("Profile");
  const authCtx = useContext(AuthContext);
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    if (authCtx.user.access === "0") {
      setDesignation("Admin");
    } else if (authCtx.user.access === "1") {
      setDesignation("Member");
    } else if (authCtx.user.access === "2") {
      setDesignation("User");
    } else if (authCtx.user.access === "3") {
      setDesignation("Alumni");
    }
  }, [authCtx.user.access]);

  const getActivePage = () => {
    if (designation === "Admin") {
      switch (activePage) {
        case "Event":
          return <ViewEvent />;
        case "Form":
          return <NewForm />;
        case "Members":
          return <ViewMember />;
        default:
          return <ProfileView />;
      }
    } 
    else if (designation !== "Admin") {
      switch (activePage) {
        case "Event":
          return <EventsView />;
        default:
          return <ProfileView />;
      }
    }
  };

  return (
    <Layout>
      <div className={style.profile}>
        <Sidebar
          activepage={activePage}
          handleChange={setActivePage}
        />
        <div className={style.profile__content}>{getActivePage()}</div>
      </div>
    </Layout>
  );
};

export default Profile;
