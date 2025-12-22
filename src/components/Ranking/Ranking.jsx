import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Ranking.module.css";

function Ranking({ rankings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rankingLevel, setRankingLevel] = useState("all");
  const [sortBy, setSortBy] = useState("time");

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const showRankings = (level) => {
    setRankingLevel(level);
  };

  const sortRankings = (sortBy) => {
    setSortBy(sortBy);
    if (sortBy === "time") {
      rankings.sort((a, b) => a.time - b.time);
    } else if (sortBy === "clicks") {
      rankings.sort((a, b) => a.clicks - b.clicks);
    }
  };

  const rankingsByLevel = () => {
    if (rankingLevel === "all") {
      return rankings;
    } else if (rankingLevel === "easy") {
      return rankings.filter((entry) => entry.level === "easy");
    } else if (rankingLevel === "hard") {
      return rankings.filter((entry) => entry.level === "hard");
    }
  };

  return (
    <div className={styles.ranking}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.rankingButton}
      >
        {isOpen ? "Hide rankings 🏆" : "View rankings 🏆"}
      </Button>

      {isOpen && (
        <div className={styles.rankingPanel}>
          <h2 className={styles.title}>Top 10 Players 🏆</h2>
          <div className={styles.levelSelector}>
            <p className={styles.levelLabel}>Show rankings for level:</p>
            <div className={styles.levelButtons}>
              <button
                className={styles.levelButton}
                onClick={() => showRankings("easy")}
              >
                Easy
              </button>
              <button
                className={styles.levelButton}
                onClick={() => showRankings("hard")}
              >
                Hard
              </button>
              <button
                className={styles.levelButton}
                onClick={() => showRankings("all")}
              >
                All
              </button>
            </div>
          </div>
          <div className={styles.sortSelector}>
            <p className={styles.sortLabel}>Sort by:</p>
            <div className={styles.sortButtons}>
              <button
                className={styles.sortButton}
                onClick={() => sortRankings("time")}
              >
                Time
              </button>
              <button
                className={styles.sortButton}
                onClick={() => sortRankings("clicks")}
              >
                Clicks
              </button>
            </div>
          </div>
          {rankingsByLevel().length > 0 ? (
            <ol className={styles.list}>
              {rankingsByLevel()
                .slice(0, 10)
                .map((entry, index) => (
                  <li
                    key={`${rankingLevel}-${
                      entry.id || entry.name
                    }-${sortBy}-${index}`}
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
                      <span className={styles.level}>🎯 {entry.level}</span>
                    </span>
                  </li>
                ))}
            </ol>
          ) : (
            <p className={styles.empty}>
              No{" "}
              {rankingLevel === "all" ? "rankings" : `${rankingLevel} rankings`}{" "}
              yet. Be the first! 🎯
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Ranking;
