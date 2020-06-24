const Card = require('./Card');
const { radixSort } = require('util/radixSort');
const bubbleSortLastCard = require('util/bubbleSortLastElement');

class Player {
  /**
   * @param {String=randomName} name –
   * @param {[Number]} seatPosition – The index of where the player is sitting the table
   */
  constructor(name = 'player', seatPosition) {
    this.name = name;
    this.hand = [];
    this.captured = [];
    this.score = 0;
    this.seatPosition = seatPosition;
  }

  /**Compares cards by their ids*/
  comparator(a, b) {
    return a.id - b.id;
  }

  /**Throws and error if the card is not an instance of Card */
  throwErrorIfNotInstanceOfCard(card) {
    if (!(card instanceof Card)) {
      throw new Error(
        `The provided card must be an instance of Card; received=${JSON.stringify(
          card,
          null,
          2,
        )}`,
      );
    }
  }

  /**
   * Sorts the last card into the rest of the sorted hand
   * @returns {Player}
   */
  bubbleSortLastCard() {
    const { hand } = this;
    this.hand = bubbleSortLastCard(hand, (card) => card.id);
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

  /** Helper function for playCardFromHand and playCardGroupFromHand. Writes card to the player's seat position if exists. Otherwise just pushes to table */
  writeToTable(card, table = []) {
    const { seatPosition } = this;
    if (typeof seatPosition === 'number') table[seatPosition] = card;
    else table.push(card);
  }

  /**
   * Plays a card from player's hand to the table
   * @param {Number} cardIndex – Index of the card in hand
   * @param {[Array]} table – The table from Deck class
   * @param {[Function]} parseCard – In case mutating the card is necessary for the game
   * @returns {Card} – The played card
   */
  playCardFromHand(cardIndex, table = [], parseCard = (x) => x) {
    const { hand } = this;
    let card = hand[cardIndex];
    this.throwErrorIfNotInstanceOfCard(card);
    card = parseCard(card);
    hand.splice(cardIndex, 1);
    this.writeToTable(card, table);
    return card;
  }

  /**
   * Plays multiple cards from hand to the table
   * @param {[Number]} cardIndeces
   * @param {Array} table
   * @param {[Function]} parseCardGroup – Used to identify a specific category of card groups. May throw an error if the card group does not fit into any category
   * @returns {[Card]} – The played card group
   */
  playCardGroupFromHand(
    cardIndeces = [],
    table = [],
    parseCardGroup = (cards) => cards,
  ) {
    const { hand } = this;
    let cardGroup = [];

    // get and validate cards
    for (let i = 0; i < cardIndeces.length; i++) {
      const cardIndex = cardIndeces[i];
      const card = hand[cardIndex];
      this.throwErrorIfNotInstanceOfCard(card);
      cardGroup.push(card);
    }

    cardGroup = parseCardGroup(cardGroup);

    // delete cards from hand
    for (let i = 0; i < cardIndeces.length; i++) {
      const cardIndex = cardIndeces[i];
      hand[cardIndex] = null;
    }

    this.writeToTable(cardGroup, table);
    this.sortHandAndClean();

    return cardGroup;
  }

  /**
   * Flexibly plays either a card or a card group from hand to table, depending on the input
   * @param {Array | Number} cardIndeces
   * @param {[Array]} table
   * @param {[Function]} parseCards
   * @returns {Card | [Card]} – The played card or card group
   */
  playCardOrGroupFromHand(cardIndeces, table = [], parseCards = (x) => x) {
    if (cardIndeces instanceof Array)
      return this.playCardGroupFromHand(cardIndeces, table, parseCards);
    else return this.playCardFromHand(cardIndeces, table, parseCards);
  }

  /**
   * Uses radix sort to sort hand and clears nulls from the hand.
   * Assumes that all cards in hand are instanceof Card.
   * Does not do an in-place sort to prevent the frontend from constantly updating before finishing
   */
  sortHand(parse = (card) => card.id) {
    this.hand = radixSort(this.hand, parse);
  }

  /**
   * Invokes sort hand and removes all non instances of Card from the hand
   */
  sortHandAndClean() {
    this.sortHand((card) => {
      if (!(card instanceof Card)) return 99;
      else return card.id;
    });

    const { hand } = this;
    let i = hand.length - 1;
    while (hand[i] === null) {
      hand.pop();
      i--;
    }
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
      if (card instanceof Array) {
        for (let i = 0; i < card.length; i++) {
          this.updateScoreWithCard(card[i]);
          captured.push(card[i]);
        }
      } else {
        this.updateScoreWithCard(card);
        captured.push(card);
      }
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
