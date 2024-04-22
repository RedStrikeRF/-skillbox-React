export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.createCard();
    this.flipCard = flip;
    this.cardNumber = cardNumber;
    this.open = false;
    this.addListener();
  }

  createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    this._cardElement = card;
    this.container.append(card);
  }

  addListener() {
    this._cardElement.addEventListener('click', () => {
      this.flipCard(this._cardElement);
    })
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    if (value) {
      this._cardElement.textContent = this._cardNumber;
    } else {
      this._cardElement.textContent = "";
    }

    this._open = value;
  }

  get open() {
    return this._open;
  }
}
