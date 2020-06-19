const Card = require('./Card');

/**Creates a Deck of Cards */
class Deck {
	constructor(nDecks = 1, options = {}) {
		if (typeof nDecks !== 'number' || nDecks < 1)
			throw new Error(`deck must be number 0 < n; received nDecks=${nDecks}`);

		const defaultOptions = {
			jokers: false,
		};
		this.options = Object.assign(defaultOptions, options);
		this.nDecks = nDecks;
	}

	/**
	 * Builds deck
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
}
