import { PairGenerator } from "./pairGenerator.js";
import { Card } from "./Card.js";

const cardsContainer = document.querySelector('.card-container');
const gamePairs = new PairGenerator(6).pairs;

const cards = [];
const openCards = [];
function flipCard(card) {
  if (openCards.length > 2) {
    openCards.forEach(card => {
      console.log(card);
    })
    openCards = ''
  }
  openCards.push(card);
}
gamePairs.forEach((cardNumber) => {
  const card = new Card(cardsContainer, cardNumber, flipCard);
  cards.push(card);
});


console.log(cards)