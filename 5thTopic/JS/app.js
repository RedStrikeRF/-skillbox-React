import { PairGenerator } from "./pairGenerator.js";
import { Card } from "./Card.js";
import { AmazingCard } from "./amazingCard.js";

const cardsContainer = document.querySelector('.card-container');

const gamePairs = new PairGenerator(6).pairs;
let openedCards = [];
let openedCardCount = 0;

function flip(card) {
  if (card.open || card.success) return;

  if (openedCardCount < 2) {
    card.open = true;
    openedCardCount += 1;
    openedCards.push(card);
  } else { 
    if (openedCards[0].cardDown.innerHTML == openedCards[1].cardDown.innerHTML) {
      openedCards.forEach(card => { card.success = true; })
      
    } else {
      openedCards.forEach(card => {
        card.open = false;
      });
    }
    openedCards = [];
    openedCardCount = 0;
  }
}

for (const cardContent of gamePairs) {
  const card = new AmazingCard(cardsContainer, cardContent, flip);
  card.card.addEventListener('click', (event) => {
    event.preventDefault();

    card.flip(card);
  })
}