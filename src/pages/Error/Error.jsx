import { useNavigate } from 'react-router-dom';
import errorImage from "../../assets/images/errorPage.jpg";
import styles from "./styles/Error.module.scss";

function Error() {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.errorImage}>
      <div className={styles.box}>
      <img src={errorImage} alt="Error Page" />
      <p>The webpage you are looking for is currently under maintainence. Please try again later. If the problem continues, mail us at
      </p>
      <button onClick={handleReturnToHome}>Return To Home</button>
      </div>
    </div>
  );
}

export default Error;


