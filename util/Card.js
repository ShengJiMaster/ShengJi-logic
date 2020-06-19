/**Default suits */

/** Class respresenting a playing card */

class Card {
	/**
	 * Create a card
	 * @param {Number} id – An integer from 1–54, inclusive, representing the card ID
	 */
	constructor(id) {
		if (id < 0 || 53 < id || typeof id !== 'number')
			throw new Error(
				`id must be number between 0-53, inclusive; received id=${id}`,
			);

		this.id = id;
		this.suits = ['clubs', 'diamonds', 'hearts', 'spades', 'joker'];
		this.ranks = [
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'jack',
			'queen',
			'king',
			'ace',
		];
	}

	/**
	 * gets verbal description of the card
	 * @returns {Object} with fields id, suit, and num
	 */
	get verbose() {
		const id = this.id;
		// handle jokers
		if (id === 52) return { id, suit: 'joker', rank: 'sm' };
		if (id === 53) return { id, suit: 'joker', rank: 'lg' };

		// handle standard cards
		const r = id % 13;
		const rank = this.ranks[r];
		const s = (id - r) / 13;
		const suit = this.suits[s];
		return { id, rank, suit };
	}

	/**
	 * toTrickRank –
	 * @param {Number} leadSuit
	 * @param {Number} trumpSuit
	 * @param {Number} trumpRank
	 * @returns {Number}
	 */
	toTrickRank(leadSuit, trumpSuit, trumpNum = 12) {
		const id = this.id;
		// handle jokers
		if (id > 51) return id;

		// handle standard cards
		const r = id % 13;
		const s = (id - n) / 13;

		const suit = this.suits[s];
		return { id, rank, suit };
	}
}

// const my = new Card(52);
// console.log(my.verbose);

module.exports = Card;
