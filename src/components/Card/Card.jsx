import styles from "./Card.module.css";

function Card({ image, id, onClick, className }) {
  const additionalClasses = className
    ? className.split(' ')
        .filter(cls => cls && styles[cls])
        .map(cls => styles[cls])
        .join(' ')
    : '';
  const cardClass = additionalClasses 
    ? `${styles.card} ${additionalClasses}`
    : styles.card;
  return (
    <div className={cardClass} onClick={onClick}>
      <img src={image} alt="Memory Card" className={styles.image} id={id} />
    </div>
  );
}

export default Card;
