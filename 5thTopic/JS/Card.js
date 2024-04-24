export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this.flip = flip;
    this.createElement();
    this.cardContent = cardNumber;
    this.success = false;
    this.open = false;
  }

  createElement(cardNumber) {
    this.card = document.createElement('button');
    this.card.classList.add('card');

    this.cardDown = document.createElement('div');
    this.cardDown.classList.add('cardDown');
    this.card.append(this.cardDown);

    this.cardUp = document.createElement('div');
    this.cardUp.classList.add('cardUp');
    this.card.append(this.cardUp);

    this.container.append(this.card);
  }

  set cardContent(number) {
    this._cardContent = number;
    this.cardDown.textContent = this._cardContent;
  }

  get cardContent() {
    return this._cardContent;
  }
  
  set success(value) {
    this._success = value;
    // this.cardUp.display = value ? 'none' : 'flex';
    this.cardDown.style.filter = value ? 'hue-rotate(120deg)' : 'none';
    this.card.disabled = value;
  }

  get success() {
    return this._success;
  }

  get open() {
    return this._open;
  }

  set open(value) {
    this.cardUp.style.display = value ? 'none' : 'flex';
    this._open = value;
  }
}