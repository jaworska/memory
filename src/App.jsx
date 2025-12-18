import card1 from "./assets/card1.png";
import card2 from "./assets/card2.png";
import card3 from "./assets/card3.png";
import card4 from "./assets/card4.png";
import card5 from "./assets/card5.png";
import card6 from "./assets/card6.png";
import card7 from "./assets/card7.png";
import card8 from "./assets/card8.png";
import Card from "./components/Card/Card";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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

let clicks = 0;

const shuffleCards = () => {
  return [...cards, ...cards]
    .map((card, index) => ({ ...card, id: index }))
    .sort(() => Math.random() - 0.5);
};

function App() {
  const [cardsState, setCardsState] = useState(shuffleCards());

  useEffect(() => {
    const allMatched = cardsState.every((card) => card.matched);
    if (allMatched && cardsState.length > 0) {
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
    }
  }, [cardsState]);

  const resetGame = () => {
    clicks = 0;
    setCardsState(shuffleCards());
  };

  const clickCard = (e) => {
    clicks += 1;
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
        <div className={styles.cardGrid}>
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
        <button className={styles.resetButton} onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </>
  );
}

export default App;
