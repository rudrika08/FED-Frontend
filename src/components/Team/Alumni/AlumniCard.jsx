import styles from "./styles/AlumniCard.module.scss";
import Button from "../../Core/Button";

function AlumniCard () {
  return (
    <div className={styles.cards}>
      <div className={styles.one}>
        <div className={styles.image}></div>
        <div className={styles.name}>
          <p>Krishnanu Roy</p>
        </div>
        <Button
          variant="secondary"
          style={{
            width: "100%",
            borderColor: "#5550509f",
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default AlumniCard;
