import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';
import styles from './styles/ShareTeamData.module.scss';
import { X } from 'lucide-react';

const ShareTeamData = ({ onClose, teamData }) => {
  const { teamName, teamCode } = teamData;
  const message = `Congratulations! Your team "${teamName}" with code "${teamCode}" has been successfully registered!🎉🎉`;
  const websiteUrl = window.location.href;  // Replace this with your actual website URL

  return (
    <div className={styles.shareContainer}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.maindiv}>
        <div className={styles.closebtn} onClick={onClose}>
          <X />
        </div>
        <h2 style={{fontWeight:"bold"}}>Share Team Name And Team Code</h2>
        <p style={{color:"#ffffff90" ,textWrap:"wrap"}}>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <FacebookShareButton url={websiteUrl} quote={message} hashtag="#TeamSuccess">
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={websiteUrl} title={message} hashtags={['TeamSuccess']}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton url={websiteUrl} title="Team Success" summary={message} source="YourApp">
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={websiteUrl} title={message} separator=":: ">
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareTeamData;
