const Nums = require('./Nums');
const Suits = require('./Suits');
const cardValue = require('./cardValue');

class Card {
	constructor(val) {
		this.val = val;
		const num = nums[n];
		const suit = suits[s];

		if (!num) throw new Error(`Card(number): ${n} is not valid!`);
		this.number = num;

		// handle joker
		if (n < 2) {
			this.suit = suits[suits.length - 1];
			return;
		}

		//handle standard card
		if (s === suits.length - 1)
			throw new Error('Card: n < 2 can be of the suit joker');
		if (!suit) throw new Error(`Card: 0<=s-${s}!<=3 must be true`);
		this.suit = suit;
	}
}

module.exports = Card;
