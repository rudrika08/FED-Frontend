import React, { useState } from 'react';
import styles from './styles/MemberCard.module.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const MemberCard = ({ name, image, social, title, role, know }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.teamMember}>
      <div className={styles.teamMemberInner}>
        <div className={styles.teamMemberFront}>
          <img src={image} alt={name} className={styles.teamMemberImg} />
          <div className={styles.teamMemberInfo}>
            <h4 style={{ color: '#FF5C00' }}>{name}</h4>
          </div>
        </div>
        <div className={styles.teamMemberBack}>
          {!showMore ? (
            <>
              <h3 style={{ color: '#fff' }}>{title}</h3>
              <div className={styles.socialLinks}>
                {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
              </div>
              {role === 'Director' && <button onClick={() => setShowMore(true)}>Know More</button>}
            </>
          ) : (
            <div className={styles.knowMoreContent}>
              <div className={styles.knowPara}><p>{know}</p></div>
              <button onClick={() => setShowMore(false)}>Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;