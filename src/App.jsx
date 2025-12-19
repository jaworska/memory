import card1 from "./assets/card1.png";
import card2 from "./assets/card2.png";
import card3 from "./assets/card3.png";
import card4 from "./assets/card4.png";
import card5 from "./assets/card5.png";
import card6 from "./assets/card6.png";
import card7 from "./assets/card7.png";
import card8 from "./assets/card8.png";
import card9 from "./assets/card9.png";
import card10 from "./assets/card10.png";
import card11 from "./assets/card11.png";
import card12 from "./assets/card12.png";
import card13 from "./assets/card13.png";
import card14 from "./assets/card14.png";
import card15 from "./assets/card15.png";
import card16 from "./assets/card16.png";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Card from "./components/Card/Card";
import Summary from "./components/Summary/Summary";
import Header from "./components/Header/Header";
import WinModal from "./components/WinModal/WinModal";
import { saveScore, getRankings } from "./firebase";

const cards = [
  { src: card1, matched: false, checked: false, pairId: 1 },
  { src: card2, matched: false, checked: false, pairId: 2 },
  { src: card3, matched: false, checked: false, pairId: 3 },
  { src: card4, matched: false, checked: false, pairId: 4 },
  { src: card5, matched: false, checked: false, pairId: 5 },
  { src: card6, matched: false, checked: false, pairId: 6 },
  { src: card7, matched: false, checked: false, pairId: 7 },
  { src: card8, matched: false, checked: false, pairId: 8 },
];

const cardsHard = [
  ...cards,
  { src: card9, matched: false, checked: false, pairId: 9 },
  { src: card10, matched: false, checked: false, pairId: 10 },
  { src: card11, matched: false, checked: false, pairId: 11 },
  { src: card12, matched: false, checked: false, pairId: 12 },
  { src: card13, matched: false, checked: false, pairId: 13 },
  { src: card14, matched: false, checked: false, pairId: 14 },
  { src: card15, matched: false, checked: false, pairId: 15 },
  { src: card16, matched: false, checked: false, pairId: 16 },
];

let clicks = 0;
let allClicks = 0;

const getCardsByLevel = (level) => {
  if (level === "easy") {
    return [...cards, ...cards]
      .map((card, index) => ({ ...card, id: index }))
      .sort(() => Math.random() - 0.5);
  } else {
    return [...cardsHard, ...cardsHard]
      .map((card, index) => ({ ...card, id: index }))
      .sort(() => Math.random() - 0.5);
  }
};

const shuffleCards = (level) => {
  return getCardsByLevel(level);
};

function App() {
  const [level, setLevel] = useState("easy");
  const [cardsState, setCardsState] = useState(shuffleCards(level));
  const [time, setTime] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [rankings, setRankings] = useState([]);
  const [showWinModal, setShowWinModal] = useState(false);

  // Check if game is won
  const gameWon =
    cardsState.length > 0 && cardsState.every((card) => card.matched);

  useEffect(() => {
    if (gameWon) return; // Stop timer when game is won

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameWon]);

  useEffect(() => {
    if (gameWon && !showWinModal) {
      // Vibrate phone on win (if supported)
      if (navigator.vibrate) {
        navigator.vibrate([400]);
      }

      // Show confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ac8cff", "#ffffff"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ac8cff", "#ffffff"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Show modal after a brief delay
      setTimeout(() => {
        setShowWinModal(true);
      }, 1000);
    }
  }, [gameWon, showWinModal]);

  useEffect(() => {
    const rankingsFetch = async () => {
      const scores = await getRankings();
      setRankings(scores);
    };

    rankingsFetch();
  }, []);

  const resetGame = () => {
    clicks = 0;
    allClicks = 0;
    setTime(0);
    setShowWinModal(false);
    setCardsState(shuffleCards(level));
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await saveScore(playerName, time, allClicks);
      const scores = await getRankings();
      setRankings(scores);
    }
  };

  const handleCloseModal = () => {
    setShowWinModal(false);
    resetGame();
  };

  const clickCard = (e) => {
    clicks += 1;
    allClicks += 1;
    if (clicks > 2) {
      cardsState.forEach((card) => {
        if (!card.matched) {
          card.checked = false;
        }
      });
      clicks = 1;
    }
    cardsState.find((card) => card.id === parseInt(e.target.id)).checked = true;
    const checkedCards = cardsState.filter(
      (card) => card.checked && !card.matched
    );
    if (checkedCards.length === 2) {
      if (checkedCards[0].pairId === checkedCards[1].pairId) {
        cardsState.forEach((card) => {
          if (card.pairId === checkedCards[0].pairId) {
            card.matched = true;
          }
        });
      }
    }
    setCardsState([...cardsState]);
  };
  return (
    <>
      <div className={styles.container}>
        <Header
          level={level}
          onLevelChange={(newLevel) => {
            setLevel(newLevel);
            setCardsState(shuffleCards(newLevel));
          }}
        />
        <div
          className={`${styles.cardGrid} ${
            level === "hard" ? styles.hard : ""
          }`}
        >
          {cardsState.map((card, index) => (
            <Card
              key={index}
              image={card.src}
              id={card.id}
              matched={card.matched}
              className={`${card.matched ? "matched" : ""} ${
                card.checked ? "checked" : ""
              }`}
              onClick={clickCard}
            />
          ))}
        </div>
        <Summary time={time} clicks={allClicks} onReset={resetGame} />
      </div>

      {showWinModal && (
        <WinModal
          time={time}
          clicks={allClicks}
          playerName={playerName}
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
