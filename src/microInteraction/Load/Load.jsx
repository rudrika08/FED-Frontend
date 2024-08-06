import { useEffect } from "react";
import styles from "./styles/load.module.scss";
import { Commet } from "react-loading-indicators";

export default function Loading() {
  useEffect(() => {

    document.body.classList.add(styles.noScroll);
    return () => document.body.classList.remove(styles.noScroll);
  }, []);

  return (
    <div className={styles.pageLoad}>
      <Commet color="#FF5C00" size="large" />
    </div>
  );
}
