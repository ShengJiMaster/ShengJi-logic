const Nums = require('./Nums');
const Suits = require('./Suits');

class Card {
	constructor(n, s) {
		const num = Nums.vals[n];
		const suit = Suits.vals[s];

		if (!num) throw new Error(`Card(number): ${n} is not valid!`);
		this.number = number;

		// handle joker
		if (num > 13) {
			this.suit = Suits.vals[4];
			return;
		}

		//handle standard card
		if (!suit) throw new Error(`Card(suit): ${s} is not valid!`);
		this.suit = suit;
	}
}

module.exports = Card;
