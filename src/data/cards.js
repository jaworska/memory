import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import card5 from "../assets/card5.png";
import card6 from "../assets/card6.png";
import card7 from "../assets/card7.png";
import card8 from "../assets/card8.png";
import card9 from "../assets/card9.png";
import card10 from "../assets/card10.png";
import card11 from "../assets/card11.png";
import card12 from "../assets/card12.png";
import card13 from "../assets/card13.png";
import card14 from "../assets/card14.png";
import card15 from "../assets/card15.png";
import card16 from "../assets/card16.png";

export const easyCards = [
    { src: card1, matched: false, checked: false, pairId: 1 },
    { src: card2, matched: false, checked: false, pairId: 2 },
    { src: card3, matched: false, checked: false, pairId: 3 },
    { src: card4, matched: false, checked: false, pairId: 4 },
    { src: card5, matched: false, checked: false, pairId: 5 },
    { src: card6, matched: false, checked: false, pairId: 6 },
    { src: card7, matched: false, checked: false, pairId: 7 },
    { src: card8, matched: false, checked: false, pairId: 8 },
];

export const hardCards = [
    ...easyCards,
    { src: card9, matched: false, checked: false, pairId: 9 },
    { src: card10, matched: false, checked: false, pairId: 10 },
    { src: card11, matched: false, checked: false, pairId: 11 },
    { src: card12, matched: false, checked: false, pairId: 12 },
    { src: card13, matched: false, checked: false, pairId: 13 },
    { src: card14, matched: false, checked: false, pairId: 14 },
    { src: card15, matched: false, checked: false, pairId: 15 },
    { src: card16, matched: false, checked: false, pairId: 16 },
];

export const getCardsByLevel = (level) => {
    const baseCards = level === "easy" ? easyCards : hardCards;
    return [...baseCards, ...baseCards]
        .map((card, index) => ({ ...card, id: index }))
        .sort(() => Math.random() - 0.5);
};
