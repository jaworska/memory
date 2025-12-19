import styles from "./Header.module.css";

function Header({ level, onLevelChange }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Memory Game</h1>
      <div className={styles.controls}>
        <div className={styles.levelSelector}>
          <select
            className={styles.select}
            id="level"
            value={level}
            onChange={(e) => onLevelChange(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
