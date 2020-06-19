/** Class respresenting a playing card */
class Card {
	/**
	 * Creates a card
	 * @param {Number} id – An integer from 1–54, inclusive, representing the card ID
	 */
	constructor(id) {
		if (typeof id !== 'number' || id < 0 || 53 < id)
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
	 * Gets the card rank index
	 * @returns {Number}
	 */
	get r() {
		const id = this.id;
		return id % 13;
	}

	/**
	 * Gets the card suit index
	 * @returns {Number} 0 <= n <= 4
	 */
	get s() {
		const { id, r } = this;
		return (id - r) / 13;
	}

	/**
	 * gets verbal description of the card
	 * @returns {Object} with fields id, suit, and num
	 */
	get verbose() {
		const { id, r, s } = this;
		// handle jokers
		if (id === 52) return { id, suit: 'joker', rank: 'sm' };
		if (id === 53) return { id, suit: 'joker', rank: 'lg' };

		// handle standard cards
		const rank = this.ranks[r];
		const suit = this.suits[s];
		return { id, rank, suit };
	}

	get maxTrickRank() {
		return 32;
	}

	/**
	 * toTrickRank – calculates a card's relative value in a trick in constant time and memory
	 * @param {Number} leadSuit – 0 <= leadSuit <= 3
	 * @param {Number} trumpSuit – 0 <= trumpSuit <= 3
	 * @param {Number=12} trumpRank – 0 <= trumpRank <= 12
	 * @returns {Number} – 0 <= trickRank <= 27
	 */
	toTrickRank(leadSuit, trumpSuit, trumpRank = 12) {
		const { id, r, s, maxTrickRank } = this;
		if (id === 53) return maxTrickRank;
		if (id === 52) return maxTrickRank - 1;

		if (typeof trumpSuit !== 'number' || trumpSuit < 0 || 3 < trumpSuit)
			throw new Error(
				`trumpSuit must be 0 <= n <= 3; received trumpSuit=${trumpSuit}`,
			);

		if (typeof leadSuit !== 'number' || leadSuit < 0 || 3 < leadSuit)
			throw new Error(
				`leadSuit must be 0 <= n <= 3; received leadSuit=${leadSuit}`,
			);

		if (typeof trumpRank !== 'number' || trumpRank < 0 || 12 < trumpRank)
			throw new Error(
				`trumpRank must be 0 <= n <= 12; received trumpRank=${trumpRank}`,
			);

		if (s === trumpSuit && r === trumpRank) return maxTrickRank - 2;
		if (r === trumpRank) return maxTrickRank - 3;
		if (s === trumpSuit) return 14 + r;
		if (s === leadSuit) return 1 + r;
		else return 0;
	}
}

// const my = new Card(52);
// console.log(my.verbose);

module.exports = Card;
