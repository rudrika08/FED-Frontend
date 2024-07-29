import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './styles/TeamCard.module.scss';
import TeamCardSkeleton from '../../layouts/Skeleton/TeamCard/TeamCard';
import { Button } from '../Core';
import AuthContext from '../../context/AuthContext';

const TeamCard = ({
  name,
  image,
  social,
  title,
  data,
  role,
  know,
  customStyles = {},
  onUpdate,
  onRemove,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const authCtx = useContext(AuthContext);

  const isDirectorRole =
    ['PRESIDENT', 'VICEPRESIDENT'].includes(role) || role.startsWith('DIRECTOR_');

  const handleImageLoad = () => {
    setContentLoaded(true);
  };
  console.log(data);

  return (
    <div className={`${styles.teamMember} ${customStyles.teamMember || ''}`}>
      {!contentLoaded && <TeamCardSkeleton customStyles={customStyles} />}
      <div className={styles.teamMemberInner} style={{ display: contentLoaded ? 'block' : 'none' }}>
        <div className={`${styles.teamMemberFront} ${customStyles.teamMemberFront || ''}`}>
          <div className={styles.ImgDiv}>
            <img
              src={image}
              alt={`Profile of ${name}`}
              className={styles.teamMemberImg}
              onLoad={handleImageLoad}
              style={{ display: 'block' }}
            />
          </div>
          <div className={`${styles.teamMemberInfo} ${customStyles.teamMemberInfo || ''}`}>
            <h4 style={{ color: '#000' }}>{name}</h4>
          </div>
        </div>
        <div className={`${styles.teamMemberBack} ${customStyles.teamMemberBack || ''}`}>
          {!showMore ? (
            <>
              <h5 className={`${styles.teamMemberBackh5} ${customStyles.teamMemberBackh5 || ''}`} style={{ color: '#fff' }}>
                {title}
              </h5>
              <div className={`${styles.socialLinks} ${customStyles.socialLinks || ''}`}>
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLinksa} ${customStyles.socialLinksa || ''}`}
                  >
                    <FaLinkedin />
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLinksa} ${customStyles.socialLinksa || ''}`}
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
              {isDirectorRole && (
                <button
                  onClick={() => setShowMore(true)}
                  aria-expanded={showMore}
                  className={`${styles.button} ${customStyles.button || ''}`}
                >
                  Know More
                </button>
              )}
            { onUpdate && authCtx.user.access==="ADMIN"  && <div className={`${styles.updatebtn} ${customStyles.updatebtn || ''}`}>
                <Button  onClick={(e) => {
              e.preventDefault();
              if (onUpdate) {
              console.log(data);
                authCtx.memberData = data;
                onUpdate();
              }
            }}>
                  Update</Button>
                <Button onClick={() => onRemove(name, role, title)}>Remove</Button>
              </div>
}
            </>
          ) : (
            <div className={`${styles.knowMoreContent} ${customStyles.knowMoreContent || ''}`}>
              <div className={`${styles.knowPara} ${customStyles.knowPara || ''}`}>
                <p>{know}</p>
              </div>
              <button
                onClick={() => setShowMore(false)}
                aria-expanded={showMore}
                className={`${styles.button} ${customStyles.button || ''}`}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  social: PropTypes.shape({
    linkedin: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  know: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TeamCard;
