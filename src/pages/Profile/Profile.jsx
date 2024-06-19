import React, { useState, useContext, useEffect } from 'react';
import Layout from '../../layouts/Profile/ProfileLayout/ProfileLayout';
import Sidebar from '../../layouts/Profile/Sidebar/Sidebar';
import AuthContext from '../../store/AuthContext';

import {UserProfile, UserEvents, 
        MemberProfile, MemberEvents, 
        AlumniProfile, AlumniEvents,
        NewForm, ViewMember, ViewEvent, AdminProfile} from '../../components/Profile';
// import UserProfile from '../../components/Profile/User/UserProfile/UserProfile';
// import UserEvents from '../../components/Profile/User/UserEvents/UserEvents';

// import MemberProfile from '../../components/Profile/Member/MemberProfile/MemberProfile';
// import MemberEvents from '../../components/Profile/Member/MemberEvents/MemberEvents';

// import AdminForm from "../../components/Profile/Admin/Form/NewForm/NewForm";
// import AdminMembers from "../../components/Profile/Admin/View/ViewMember/ViewMember";
// import AdminEvents from "../../components/Profile/Admin/View/ViewEvent/VIewEvent";
// import AdminProfile from "../../components/Profile/Admin/AdminProfile/AdminProfile";

// import AlumniProfile  from '../../components/Profile/Alumni/AlumniProfile/AlumniProfile';
// import AlumniEvents from '../../components/Profile/Alumni/AlumniEvents/AlumniEvents';

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
          return <AdminProfile />;
      }
    } 
    else if (designation === "Member") {
      switch (activePage) {
        case "Event":
          return <MemberEvents />;
        default:
          return <MemberProfile />;
      }
    }
    else if (designation === "User") {
      switch (activePage) {
        case "Event":
          return <UserEvents />;
        default:
          return <UserProfile />;
      }
    }
    else if (designation === "Alumni") {
      switch (activePage) {
        case "Event":
          return <AlumniEvents />;
        default:
          return <AlumniProfile />;
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
