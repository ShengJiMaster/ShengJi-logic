const Card = require('./Card');
const Card = require('./Card');

class CardPlayer {
	constructor(name) {
		this.name = name;
		this.hand = [];
		this.captured = [];
	}

	/**Compares cards by their ids*/
	comparator(a, b) {
		return a.id - b.id;
	}

	/**Sorts the last card into the rest of the sorted hand
	 * @returns {CardPlayer}
	 */
	bubbleSortLastCard() {
		const { hand, comparator } = this;
		const len = this.length;
		if (len < 1) return this;
		let i = len;
		while (0 < i) {
			const swap = comparator(hand[i], hand[i - 1]) > 0;
			if (swap) {
				[hand[i], hand[i - 1]] = [hand[i - 1], hand[i]];
				return this;
			}
		}
		return this;
	}

	/**Adds and sorts card into the player's hand
	 * @returns {CardPlayer}
	 */
	addCardToHand(card) {
		const { hand } = this;
		if (!card instanceof Card)
			throw new Error(
				`card must be instance of the Card class; received card=${card}`,
			);
		hand.push(card);
		return this.bubbleSortLastCard();
	}

	/**
	 * Plays a card from player's hand
	 * @param {Number} i
	 * @returns {Card}
	 */
	playCardFromHand(i) {
		const { hand } = this;
		const card = hand.splice(i, 1);
		if (!card instanceof Card) return;
		return card;
	}

	/**
	 * Uses radix sort to sort hand. Only used when recreating game from commit log after crash
	 */
	sortHand() {}
}

module.exports = CardPlayer;
