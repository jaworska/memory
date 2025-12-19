import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Ranking.module.css";

function Ranking({ rankings }) {
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.ranking}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide rankings 🏆" : "View rankings 🏆"}
      </Button>

      {isOpen && (
        <div className={styles.rankingPanel}>
          <h2 className={styles.title}>Top 10 Players 🏆</h2>
          {rankings.length > 0 ? (
            <ol className={styles.list}>
              {rankings.slice(0, 10).map((entry, index) => (
                <li
                  key={index}
                  className={`${styles.listItem} 
                  }`}
                >
                  <span className={styles.rank}>
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `${index + 1}.`}
                  </span>
                  <span className={styles.name}>{entry.name}</span>
                  <span className={styles.stats}>
                    <span className={styles.time}>
                      ⏱️ {formatTime(entry.time)}
                    </span>
                    <span className={styles.clicks}>👆 {entry.clicks}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles.empty}>No rankings yet. Be the first! 🎯</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Ranking;
