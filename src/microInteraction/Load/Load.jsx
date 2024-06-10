import styles from "./styles/load.module.scss"
import {Commet} from "react-loading-indicators"

export default function Loading() {
  return (
    <div className={styles.pageload}>
      <Commet color="#FF5C00" size="large" />
    </div>
  )
}
