export class PairGenerator {
  constructor(count) {
    this.pairs = count
  }

  set pairs(pairsCount) {
    this._pairs = this.shuffle(this.createNumbersArray(pairsCount))
  }

  get pairs() {
    return this._pairs;
  }

  createNumbersArray(count) {
    let pairs = [];
    for (let counter = 1; counter <= count; counter++) {
        pairs.push(counter, counter);
    }
    return pairs
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}