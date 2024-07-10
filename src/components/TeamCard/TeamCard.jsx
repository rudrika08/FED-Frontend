import { useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './styles/TeamCard.module.scss';
import skeletonStyles from './styles/SkeletonStyles.module.scss';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  const isDirectorRole = ['PRESIDENT', 'VICEPRESIDENT'].includes(role) || role.startsWith('DIRECTOR_');

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`${styles.teamMember} ${customStyles.teamMember}`}>
      <div className={`${styles.teamMemberInner} ${customStyles.teamMemberInner}`}>
        <div className={`${styles.teamMemberFront} ${customStyles.teamMemberFront}`}>
          <div className={styles.ImgDiv}>
            {!imageLoaded && <Skeleton className={`${skeletonStyles.skeleton} ${customStyles.skeleton}`} />}
            <img
              src={image}
              alt={`Profile of ${name}`}
              className={`${styles.teamMemberImg} ${customStyles.teamMemberImg}`}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
          <div className={`${styles.teamMemberInfo} ${customStyles.teamMemberInfo}`}>
            <h4 style={{ color: '#000' }}>{name}</h4>
          </div>
        </div>
        <div className={`${styles.teamMemberBack} ${customStyles.teamMemberBack}`}>
          {!showMore ? (
            <>
              <h5 style={{ color: '#fff' }}>{title}</h5>
              <div className={`${styles.socialLinks} ${customStyles.socialLinks}`}>
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                )}
                {social.github && (
                  <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                )}
              </div>
              {isDirectorRole && (
                <button
                  onClick={() => setShowMore(true)}
                  aria-expanded={showMore}
                  className={customStyles.button}
                >
                  Know More
                </button>
              )}
            </>
          ) : (
            <div className={`${styles.knowMoreContent} ${customStyles.knowMoreContent}`}>
              <div className={`${styles.knowPara} ${customStyles.knowPara}`}>
                <p>{know}</p>
              </div>
              <button
                onClick={() => setShowMore(false)}
                aria-expanded={showMore}
                className={customStyles.button}
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
