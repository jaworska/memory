import { useState } from "react";
import styles from "./WinModal.module.css";
import Ranking from "../Ranking/Ranking";

function WinModal({
  time,
  clicks,
  playerName,
  onNameChange,
  onSave,
  onClose,
  rankings,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const [scoreSaved, setScoreSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave();
    setIsSaving(false);
    setScoreSaved(true);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>🎉 Congratulations! 🎉</h2>
        <p className={styles.message}>You won the game!</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>Time:</span>
            <span className={styles.value}>{formatTime(time)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Clicks:</span>
            <span className={styles.value}>{clicks}</span>
          </div>
        </div>

        <div className={styles.nameSection}>
          <label htmlFor="winName" className={styles.nameLabel}>
            Enter your name to save your score:
          </label>
          <input
            type="text"
            id="winName"
            className={styles.nameInput}
            value={playerName}
            placeholder="Your name"
            onChange={(e) => onNameChange(e.target.value)}
            autoFocus
          />
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving || scoreSaved}
          >
            {isSaving
              ? "Saving..."
              : scoreSaved
              ? "Score saved! ✓"
              : "Save score"}
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            {scoreSaved ? "Close & Play again" : "Close"}
          </button>
        </div>
        <Ranking rankings={rankings} />
      </div>
    </div>
  );
}

export default WinModal;
