import styles from "./Summary.module.css";
import Button from "../Button/Button";

function Summary({ time, clicks, onReset }) {
  return (
    <div className={styles.summary}>
      <p className={styles.clicks}>Clicks: {clicks}</p>
      <p className={styles.time}>
        Time: {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
      </p>
      <Button onClick={onReset}>Play again</Button>
    </div>
  );
}

export default Summary;
