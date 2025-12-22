import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Summary from "./components/Summary/Summary";
import Header from "./components/Header/Header";
import WinModal from "./components/WinModal/WinModal";
import GameBoard from "./components/GameBoard/GameBoard";
import { saveScore, getRankings } from "./firebase";
import { useMemoryGame } from "./hooks/useMemoryGame";
import useCelebration from "./hooks/useCelebration";

function App() {
  const [level, setLevel] = useState("easy");
  const [playerName, setPlayerName] = useState("");
  const [rankings, setRankings] = useState([]);
  const [showWinModal, setShowWinModal] = useState(false);

  const {
    cardsState,
    time,
    totalClicks,
    gameWon,
    handleCardClick,
    resetGame: resetGameState,
    changeLevel,
  } = useMemoryGame(level);

  // Celebration effect
  useCelebration(gameWon, showWinModal);

  // Show win modal after game is won
  useEffect(() => {
    if (gameWon && !showWinModal) {
      setTimeout(() => {
        setShowWinModal(true);
      }, 1000);
    }
  }, [gameWon, showWinModal]);

  // Load rankings on mount
  useEffect(() => {
    const rankingsFetch = async () => {
      const scores = await getRankings();
      setRankings(scores);
    };

    rankingsFetch();
  }, []);

  useEffect(() => {
    window.testModal = () => {
      setShowWinModal(true);
      console.log("✅ Win modal displayed for testing");
    };

    return () => {
      delete window.testModal;
    };
  }, []);

  const resetGame = () => {
    setShowWinModal(false);
    resetGameState();
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await saveScore(playerName, time, totalClicks, level);
      const scores = await getRankings();
      setRankings(scores);
    }
  };

  const handleCloseModal = () => {
    setShowWinModal(false);
    resetGame();
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    changeLevel(newLevel);
  };
  return (
    <>
      <div className={styles.container}>
        <Header level={level} onLevelChange={handleLevelChange} />
        <GameBoard
          cards={cardsState}
          level={level}
          onCardClick={handleCardClick}
        />
        <Summary time={time} clicks={totalClicks} onReset={resetGame} />
      </div>

      {showWinModal && (
        <WinModal
          time={time}
          clicks={totalClicks}
          playerName={playerName}
          level={level}
          onNameChange={setPlayerName}
          onSave={handleSaveScore}
          onClose={handleCloseModal}
          rankings={rankings}
        />
      )}
    </>
  );
}

export default App;
