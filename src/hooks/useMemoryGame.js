import { useState, useEffect } from "react";
import { getCardsByLevel } from "../data/cards";

export const useMemoryGame = (level) => {
  const [cardsState, setCardsState] = useState(() => getCardsByLevel(level));
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  // Check if game is won
  const gameWon =
    cardsState.length > 0 && cardsState.every((card) => card.matched);

  // Timer effect
  useEffect(() => {
    if (gameWon || !timerStarted) return;

    const timerInterval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameWon, timerStarted]);

  const handleCardClick = (cardId) => {
    // Start timer on first click
    if (!timerStarted) {
      setTimerStarted(true);
    }

    setClicks((prev) => (prev >= 2 ? 1 : prev + 1));
    setTotalClicks((prev) => prev + 1);

    setCardsState((prevCards) => {
      let updatedCards = [...prevCards];

      // Reset unchecked cards if this is the third click
      if (clicks >= 2) {
        updatedCards = updatedCards.map((card) =>
          card.matched ? card : { ...card, checked: false }
        );
      }

      // Check the clicked card
      updatedCards = updatedCards.map((card) =>
        card.id === cardId ? { ...card, checked: true } : card
      );

      // Check for matches
      const checkedCards = updatedCards.filter(
        (card) => card.checked && !card.matched
      );

      if (checkedCards.length === 2) {
        if (checkedCards[0].pairId === checkedCards[1].pairId) {
          // Mark matched cards
          updatedCards = updatedCards.map((card) =>
            card.pairId === checkedCards[0].pairId
              ? { ...card, matched: true }
              : card
          );
        }
      }

      return updatedCards;
    });
  };

  const resetGame = () => {
    setClicks(0);
    setTotalClicks(0);
    setTime(0);
    setTimerStarted(false);
    setCardsState(getCardsByLevel(level));
  };

  const changeLevel = (newLevel) => {
    setClicks(0);
    setTotalClicks(0);
    setTime(0);
    setTimerStarted(false);
    setCardsState(getCardsByLevel(newLevel));
  };

  return {
    cardsState,
    time,
    totalClicks,
    gameWon,
    handleCardClick,
    resetGame,
    changeLevel,
  };
};
