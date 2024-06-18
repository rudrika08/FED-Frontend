import React from 'react';
import { ShareSocial } from "react-share-social";
import style from "./style/Share.module.scss";
import { X } from 'lucide-react'

const Share = ({ onClose,urlpath }) => {
  const sharestyle = {
    root: {
      background: '#2a2a2a',
      borderRadius: 3,
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(24, 15, .3)',
      color: 'white',
    },
    copyContainer: {
      border: '1px solid blue',
      background: 'rgb(0,0,0,0.4)',
    },
    title: {
      color: 'aquamarine',
      fontStyle: 'italic',
    },
  };

  return (
    <div className={style.maindiv}>
      <div onClick={onClose} className={style.closebtn} style={{ cursor: "pointer" ,position:"absolute",right:"1.5rem",top:"1.4rem",zIndex:"20" }}><X/></div>
      <div style={{ cursor: "pointer" ,position:"absolute",left:"1.5rem",top:"1.4rem",zIndex:"20" }}>Share</div>
      <ShareSocial  
        url={urlpath}
        style={sharestyle}
        socialTypes={['facebook', 'twitter', 'whatsapp','reddit', 'linkedin']}
        onSocialButtonClicked={data => console.log(data)}    
      />
    </div>
  );
}

export default Share;
