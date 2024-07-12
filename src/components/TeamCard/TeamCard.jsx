import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './styles/TeamCard.module.scss';
import TeamCardSkeleton from '../../layouts/Skeleton/TeamCard/TeamCard';

const TeamCard = ({
  name,
  image,
  social,
  title,
  role,
  know,
  customStyles = {},
}) => {
  const [showMore, setShowMore] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  const isDirectorRole =
    ['PRESIDENT', 'VICEPRESIDENT'].includes(role) || role.startsWith('DIRECTOR_');

  const handleImageLoad = () => {
    setContentLoaded(true);
  };

  return (
    <div className={styles.teamMember}>
      {!contentLoaded && <TeamCardSkeleton customStyles={customStyles} />}
      <div className={styles.teamMemberInner} style={{ display: contentLoaded ? 'block' : 'none' }}>
        <div className={styles.teamMemberFront} style={customStyles.teamMemberFront}>
          <div className={styles.ImgDiv}>
            <img
              src={image}
              alt={`Profile of ${name}`}
              className={styles.teamMemberImg}
              onLoad={handleImageLoad}
              style={{ display: 'block' }}
            />
          </div>
          <div className={styles.teamMemberInfo} style={customStyles.teamMemberInfo}>
            <h4 style={{ color: '#000' }}>{name}</h4>
          </div>
        </div>
        <div className={styles.teamMemberBack} style={customStyles.teamMemberBack}>
          {!showMore ? (
            <>
              <h5 style={{ color: '#fff', ...customStyles.teamMemberBackh5 }}>{title}</h5>
              <div className={styles.socialLinks} style={customStyles.socialLinks}>
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" style={customStyles.socialLinksa}>
                    <FaLinkedin />
                  </a>
                )}
                {social.github && (
                  <a href={social.github} target="_blank" rel="noopener noreferrer" style={customStyles.socialLinksa}>
                    <FaGithub />
                  </a>
                )}
              </div>
              {isDirectorRole && (
                <button
                  onClick={() => setShowMore(true)}
                  aria-expanded={showMore}
                  style={customStyles.button}
                >
                  Know More
                </button>
              )}
            </>
          ) : (
            <div className={styles.knowMoreContent} style={customStyles.knowMoreContent}>
              <div className={styles.knowPara} style={customStyles.knowPara}>
                <p>{know}</p>
              </div>
              <button
                onClick={() => setShowMore(false)}
                aria-expanded={showMore}
                style={customStyles.button}
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
};

export default TeamCard;
