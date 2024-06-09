import styles from "./styles/Load.module.scss"
import {Commet} from "react-loading-indicators"

export default function Loading() {
  return (
    <div className={styles.pageload}>
      <Commet color="#FF5C00" size="large" />
    </div>
  )
}
