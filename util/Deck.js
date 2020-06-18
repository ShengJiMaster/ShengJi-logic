const Card = require('./Card');

class Deck {
	constructor(decks = 1, options = {}) {
		const defaultOptions = {
			jokers: false,
		};
		options = Object.assign(defaultOptions, options);

		this.deck = [];
		this.table = [];
		this.graveyard = [];
	}

	populateDeck(decks) {}
}
