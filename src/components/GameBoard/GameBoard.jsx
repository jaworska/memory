import Card from "../Card/Card";
import styles from "./GameBoard.module.css";

const GameBoard = ({ cards, level, onCardClick }) => {
  return (
    <div
      className={`${styles.cardGrid} ${level === "hard" ? styles.hard : ""}`}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          image={card.src}
          id={card.id}
          matched={card.matched}
          className={`${card.matched ? "matched" : ""} ${
            card.checked ? "checked" : ""
          }`}
          onClick={(e) => onCardClick(parseInt(e.target.id))}
        />
      ))}
    </div>
  );
};

export default GameBoard;
