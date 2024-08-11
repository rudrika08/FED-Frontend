import { useState, useContext, useEffect } from "react";
import { ProfileLayout, Sidebar } from "../../layouts";
import {
  ProfileView,
  EventsView,
  NewForm,
  ViewMember,
  ViewEvent,
} from "../../sections";
import AuthContext from "../../context/AuthContext";
import { api } from "../../services";
import style from "./styles/Profile.module.scss";
import { Loading } from "../../microInteraction";
import { Outlet, useNavigate } from "react-router-dom";
import {Navbar,Footer} from "../../layouts";

const Profile = () => {
  const [activePage, setActivePage] = useState("Profile");
  const authCtx = useContext(AuthContext);
  const [designation, setDesignation] = useState("Admin");
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authCtx.isLoggedIn && window.localStorage.getItem("token")) {
      fetchData();
    }
  }, [authCtx.isLoggedIn]);

  const fetchData = async () => {
    try {
      const data = {
        email: authCtx.user.email,
      };

      const token = window.localStorage.getItem("token");
      if (token) {
        const response = await api.post("/api/user/fetchProfile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          authCtx.update(
            response.data.user.name,
            response.data.user.email,
            response.data.user.img,
            response.data.user.rollNumber,
            response.data.user.school,
            response.data.user.college,
            response.data.user.contactNo,
            response.data.user.year,
            response.data.user.extra?.github,
            response.data.user.extra?.linkedin,
            response.data.user.extra?.designation,
            response.data.user.access,
            response.data.user.editProfileCount,
            response.data.user.regForm
          );
        }
        else if(response.status === 404) {
          // log out the user
        }
        else {
          console.log(response.status);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const access = authCtx.user.access;
    if (access === "ADMIN") {
      setDesignation("Admin");
    } else if (access === "ALUMNI") {
      setDesignation("Alumni");
    } else if (access === "USER") {
      setDesignation("User");
    } else {
      setDesignation("Member");
    }
  }, [authCtx.user.access]);

 

  return (
    <ProfileLayout>
      <div className={style.profile}>
        <Sidebar
          activepage={activePage}
          handleChange={(page) => {
            setActivePage(page);
            authCtx.eventData = null;
          }}
        />
        {isLoading ? <Loading /> : <div className={style.profile__content}>   <Outlet/> </div>}
      </div>
    </ProfileLayout>
  );
};

export default Profile;
