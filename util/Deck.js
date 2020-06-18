const Card = require('./Card');

class Deck {
	constructor(decks = 1, players = 4, options = {}) {
		const defaultOptions = {
			jokers: false,
			trumpSuit: false,
			trumpNum: false,
			pointCards: {},
		};

		this.options = Object.assign(defaultOptions, options);
		this.decks = decks;
		this.deck = [];
		this.players = players;
		this.playerHands = new Array(players).fill().map(() => []);
		this.table = [];
		this.graveyard = [];
	}

	populateDeck() {
		this.deck = [];
		const { decks, deck } = this;
		const { jokers } = this.options;
		const maxNum = 14;
		const maxSuit = 3;
		for (let s = 0; s <= maxSuit; s++) {
			for (let n = 0; n <= maxNum; n++) {
				const card = new Card(n, s);
				deck.push(card);
			}
		}

		if (jokers) {
			deck.push(new Card(15));
			deck.push(new Card(16));
		}
	}
}

module.exports = Deck;
