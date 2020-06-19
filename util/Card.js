/** Class respresenting a playing card */
class Card {
	/**
	 * Creates a card
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
	 * toTrickRank – calculates a card's relative value in a trick in constant time and memory
	 * @param {Number} leadSuit – 0 <= leadSuit <= 3
	 * @param {Number} trumpSuit – 0 <= trumpSuit <= 3
	 * @param {Number=12} trumpRank – 0 <= trumpRank <= 12
	 * @returns {Number} – 0 <= trickRank <= 27
	 */
	toTrickRank(leadSuit, trumpSuit, trumpRank = 12) {
		const id = this.id;
		const maxRank = 30;
		if (id === 53) return maxRank;
		if (id === 52) return maxRank - 1;

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
		const r = id % 13;
		const s = (id - r) / 13;

		if (s === trumpSuit && r === trumpRank) return maxRank - 2;
		if (r === trumpRank) return maxRank - 3;
		if (s === trumpSuit) return 14 + r;
		if (s === leadSuit) return 1 + r;
		else return 0;
	}
}

// const my = new Card(52);
// console.log(my.verbose);

module.exports = Card;
