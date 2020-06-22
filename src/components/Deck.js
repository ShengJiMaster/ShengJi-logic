const Card = require('./Card');
const _ = require('lodash');

/**Creates a Deck of Cards */
class Deck {
	constructor(nDecks = 1, options = {}) {
		if (typeof nDecks !== 'number' || nDecks < 1)
			throw new Error(`deck must be number 0 < n; received n=${n}`);

		const defaultOptions = {
			jokers: false,
		};
		this.options = Object.assign(defaultOptions, options);
		this.nDecks = nDecks;
		this.deck = [];
		this.initialize();
	}

	/**Inits the Deck based on config */
	initialize() {
		this.buildNewDeck();
		this.shuffle();
	}

	/**
	 * Builds deck
	 * @returns {[Card]}
	 */
	buildNewDeck() {
		this.deck = [];
		const { nDecks, deck } = this;
		const { jokers } = this.options;
		const cards = jokers ? 54 : 52;
		for (let d = 0; d < nDecks; d++) {
			for (let c = 0; c < cards; c++) {
				const card = new Card(c);
				deck.push(card);
			}
		}
		return this.deck;
	}

	/**
	 * Shuffles the deck
	 * @returns {[Card]}
	 */
	shuffle() {
		this.deck = _.shuffle(this.deck);
		return this.deck;
	}

	/**
	 * Draws the top card
	 * @returns {Card}
	 */
	drawCard() {
		const { deck } = this;
		return deck.pop();
	}
}

module.exports = Deck;
