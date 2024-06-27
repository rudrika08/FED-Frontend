import React from 'react';
import InstagramTopPostEmbed from './InstagramTopPostEmbed';
import InstagramBottomPostEmbed from './InstagramBottomPostEmbed';
import InstagramReelEmbed from './InstagramReelEmbed';
import LinkedInEmbedComponent from './LinkedInEmbedComponent';
import linkedinlogo from '../../assets/images/SocialMedia/linkedinLogo.svg';
import instalogo from '../../assets/images/SocialMedia/instaLogo.svg';
import styles from './styles/Social.module.scss';

const SocialMedia = () => {
  return (
    <div className={styles.socialMcontainer}>
      <div className={styles.text}>
        <div className={styles.circleCenter}></div>
        <p className={styles.content}>
          Welcome to the social media page of <br />
          <div className={styles.fed}>
            <span className={styles.highlight} id={styles.faded}>
              <img className={instalogo} src={instalogo} alt="Profile" /> FED <img className={linkedinlogo} src={linkedinlogo} alt="Profile" />
            </span>
          </div>
          <br />
        </p>
      </div>

      <div className={styles.socialMedia}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <div className={styles.sidebyside}>
              <div className={styles.instagramfeed}>
                <InstagramTopPostEmbed />
              </div>
              <div className={styles.instagramfeed2}>
                <InstagramBottomPostEmbed />
                <div className={styles.circle}></div>
              </div>
            </div>
          </div>
          <div className={styles.centerColumn}>
            <div className={styles.instagramreel}>
              <InstagramReelEmbed />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.linkedinfeed}>
              <div className={styles.circle1}></div>
              <LinkedInEmbedComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
