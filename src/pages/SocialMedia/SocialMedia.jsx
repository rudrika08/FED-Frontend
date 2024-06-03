import React from 'react';
import styles from './styles/SocialMedia.module.scss';
import { InstagramEmbed } from 'react-social-media-embed';
import { LinkedInEmbed } from 'react-social-media-embed';
import linkedinlogo from '../../assets/images/SocialMedia/linkedinLogo.svg'
import instalogo from '../../assets/images/SocialMedia/instaLogo.svg';

const SocialMedia = () => {
  return (
    <>
      <div className={styles.text}>
      <div className={styles.golaCenter}></div>
        <p className={styles.p}>
          Welcome to social media page of <br />
          <span className={styles.highlight} id={styles.faded}>
            <img className={instalogo} src={instalogo} alt="Profile" />  FED <img className={linkedinlogo} src={linkedinlogo} alt="Profile" />
          </span>
          <br />
        </p>
      </div>
      <container className={styles.socialMedia}>
        <container className={styles.container}>
          <container className={styles.leftColumn}>
            <container className={styles.sidebyside}>
            <container className={styles.instagramfeed}>
              <InstagramEmbed url="https://www.instagram.com/p/C7Bxq3-rcK7/?hl=en" height={350} width={348.45} />
            </container>
            <container className={styles.instagramfeed2}>
              <InstagramEmbed url="https://www.instagram.com/p/C7B73kprfBd/?hl=en" height={350} width={348.45} />
              <div className={styles.gola}></div>
            </container>
            </container>
          </container>
          <container className={styles.centerColumn}>
            <container className={styles.instagramreel}>
              <InstagramEmbed url="https://www.instagram.com/p/C7ErB7-SmV-/?hl=en" height={730} width={446.61} />
            </container>
          </container>
          <container className={styles.rightColumn}>
            <container className={styles.linkedinfeed}> <div className={styles.gola1}></div>
              <LinkedInEmbed
                url="https://www.linkedin.com/embed/feed/update/urn:li:share:7196928173924655106"
                postUrl="https://www.linkedin.com/posts/fedkiit_kiituniversity-fed-productdesign-activity-7196928174897700864-flSC?utm_source=share&utm_medium=member_desktop"
                width={468}
                height={730}
              />
            </container>
          </container>
        </container>
      </container>
    </>
  );
};

export default SocialMedia;
