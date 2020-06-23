const Card = require('./Card');
const { radixSort } = require('util/radixSort');
const faker = require('faker');

class Player {
  /**
   * @param {String} name
   * @param {Object=defaultOptions} options
   */
  constructor(name = faker.name.firstName(), options = {}) {
    this.name = name;
    this.hand = [];
    this.captured = [];
    this.score = 0;
  }

  /**Compares cards by their ids*/
  comparator(a, b) {
    return a.id - b.id;
  }

  /**Throws and error if the card is not an instance of Card */
  throwErrorIfNotInstanceOfCard(card) {
    if (!(card instanceof Card)) {
      throw new Error('The provided card must be an instance of Card');
    }
  }

  /**
   * Sorts the last card into the rest of the sorted hand
   * @returns {Player}
   */
  bubbleSortLastCard() {
    const { hand, comparator } = this;
    const len = hand.length;
    if (len < 1) return this;
    let i = len - 1;
    while (0 < i) {
      const swap = comparator(hand[i - 1], hand[i]) > 0;
      if (swap) {
        [hand[i], hand[i - 1]] = [hand[i - 1], hand[i]];
      } else break;
      i--;
    }
    return this;
  }

  /**
   * Adds and sorts card into the player's hand. Also claims ownership of the card
   * @returns {Player}
   */
  addCardToHand(card) {
    this.throwErrorIfNotInstanceOfCard(card);
    const { hand, name } = this;
    card.claimOwnership(name);
    hand.push(card);
    return this.bubbleSortLastCard();
  }

  /**
   * Plays a card from player's hand to the table
   * @param {Number} i
   * @param {[Array]} – The table from Deck class
   * @returns {Card} – The played card
   */
  playCardFromHand(cardIndex, table = []) {
    const { hand } = this;
    const [card] = hand.splice(cardIndex, 1);
    if (!card instanceof Card) return;
    table.push(card);
    return card;
  }

  /**
   * Uses radix sort to sort hand. Only used when recreating game from commit log after crash
   */
  sortHand(parse = (card) => card.id) {
    const hand = this.hand;
    this.hand = radixSort(hand, parse);
  }

  /**
   * Calculates the value of a card
   * @param {Card} card
   */
  appraiseCard(card) {
    this.throwErrorIfNotInstanceOfCard(card);
    return 0;
  }

  /**
   * Updates the player's score depending on a specific card
   * @param {Card} card
   */
  updateScoreWithCard(card) {
    this.throwErrorIfNotInstanceOfCard(card);
    const cardVal = this.appraiseCard(card);
    this.score += cardVal;
  }

  /**
   * Captures a hand of cards
   * @param {[Card]} hand
   * @returns {[Card]} – Array of captured cards
   */
  captureCards(hand = []) {
    const { captured } = this;
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      this.throwErrorIfNotInstanceOfCard(card);
    }

    for (let i = 0; i < hand.length; i++) {
      const card = hand[i];
      this.updateScoreWithCard(card);
      captured.push(card);
    }

    return captured;
  }

  /**
   * Clears all cards from this player
   * @returns {True}
   */
  clearCardsDangerously() {
    this.hand = [];
    this.captured = [];
    return true;
  }

  /**
   * Clears cards only if the player's hand is empty
   * @returns {Boolean}
   */
  clearCardsSafely() {
    if (this.hand.length) return false;
    else return this.clearCardsDangerously();
  }
}

module.exports = Player;
