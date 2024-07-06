import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles/TeamCard.module.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

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

  const isDirectorRole = ['PRESIDENT', 'VICEPRESIDENT'].includes(role) || role.startsWith('DIRECTOR_');

  return (
    <div className={`${styles.teamMember} ${customStyles.teamMember}`}>
      <div className={`${styles.teamMemberInner} ${customStyles.teamMemberInner}`}>
        <div className={`${styles.teamMemberFront} ${customStyles.teamMemberFront}`}>
          <img
            src={image}
            alt={`Profile of ${name}`}
            className={`${styles.teamMemberImg} ${customStyles.teamMemberImg}`}
          />
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
