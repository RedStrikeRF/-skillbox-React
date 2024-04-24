import { Card } from './Card.js';

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardContent(value) {
    const img = document.createElement('img');
    img.src = `../img/${value}.jpg`;
    img.classList.add('img')
    this.cardDown.append(img);
  }
}
