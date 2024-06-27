import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { TbUserEdit } from 'react-icons/tb';
import { SlCalender } from 'react-icons/sl';
import { SiReacthookform } from 'react-icons/si';
import AuthContext from '../../../context/AuthContext';
import styles from './styles/Sidebar.module.scss';
import Share from '../../../components/ShareContainer/Share'

import defaultImg from '../../../assets/images/defaultImg.jpg';
import camera from "../../../assets/images/camera.svg"

const Sidebar = ({ activepage, handleChange }) => {
  const [designation, setDesignation] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal,setOpen]=useState(false);

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

  const handleLogout = () => {
    navigate('/Login');
    authCtx.logout(); 
  };

  const handleModal=()=>{
    setOpen(!openModal);
  }

  const handleName = () => {
    const maxLength = 15;
    const name = authCtx.user.name || ''; 
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  const renderAdminMenu = () => (
    <>
      <div
        onClick={() => handleChange('Event')}
        style={{ color: activepage === 'Event' ? '#FF8A00' : 'white' }}
      >
        <SlCalender size={17} /> Event
      </div>
      <div
        onClick={() => handleChange('Form')}
        style={{ color: activepage === 'Form' ? '#FF8A00' : 'white' }}
      >
        <SiReacthookform size={17} /> Form
      </div>
      <div
        onClick={() => handleChange('Members')}
        style={{ color: activepage === 'Members' ? '#FF8A00' : 'white' }}
      >
        <TbUserEdit size={17} /> Members
      </div>
    </>
  );

  return (
    <>
    <div className={styles.sidebar}>
      <div className={styles.profile}>
        <a href='/profile'>
        <div style={{width:"auto",position:"relative"}}>
          <img
            src={authCtx.user.pic || defaultImg}
            alt="Profile"
            className={styles.profilePhoto}
          />
          <div style={{position:"absolute" ,bottom:"5px",right:"5px",}}><img onClick={handleChange}  src={camera}></img></div>
          </div>
        </a>
        <div className={styles.profileInfo}>
          <p className={styles.name}>{handleName()}</p>
          <p className={styles.role}>{designation}</p>
        </div>
      </div>
      <div className={styles.menu}>
        {designation === "Admin" && renderAdminMenu()}
        {designation !== "Admin" && (
          <div
            onClick={() => handleChange('Event')}
            style={{ color: activepage === 'Event' ? '#FF8A00' : 'white' }}
          >
            <SlCalender size={17} /> Event
          </div>
        )}
        <div
          onClick={handleLogout}
          style={{ color: activepage === 'Logout' ? '#FF8A00' : 'white' }}
        >
          <MdLogout size={17} /> Logout
        </div>
      </div>
      <div className={styles.divider} />
    </div>

        {openModal && <Share/>}
    </>
  );
};

export default Sidebar;
