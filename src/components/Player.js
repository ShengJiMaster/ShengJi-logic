const Card = require('./Card');
const { radixSort } = require('util/radixSort');
const faker = require('faker');

class Player {
	/**
	 * @param {String} name
	 * @param {Object=defaultOptions} options
	 */
	constructor(name = faker.name.firstName(), options = {}) {
		this.name = name;
		this.hand = [];
		this.captured = [];
	}

	/**Compares cards by their ids*/
	comparator(a, b) {
		return a.id - b.id;
	}

	/**
	 * Sorts the last card into the rest of the sorted hand
	 * @returns {Player}
	 */
	bubbleSortLastCard() {
		const { hand, comparator } = this;
		const len = hand.length;
		if (len < 1) return this;
		let i = len - 1;
		while (0 < i) {
			const swap = comparator(hand[i - 1], hand[i]) > 0;
			if (swap) {
				[hand[i], hand[i - 1]] = [hand[i - 1], hand[i]];
			} else break;
			i--;
		}
		return this;
	}

	/**
	 * Adds and sorts card into the player's hand. Also claims ownership of the card
	 * @returns {Player}
	 */
	addCardToHand(card) {
		const { hand, name } = this;
		if (!card instanceof Card)
			throw new Error(
				`card must be instance of the Card class; received card=${card}`,
			);
		card.claimOwnership(name);
		hand.push(card);
		return this.bubbleSortLastCard();
	}

	/**
	 * Plays a card from player's hand to the table
	 * @param {Number} i
	 * @param {[Array]} – The table from Deck class
	 * @returns {Card} – The played card
	 */
	playCardFromHand(i, table = []) {
		const { hand } = this;
		const card = hand.splice(i, 1);
		if (!card instanceof Card) return;
		table.push(card);
		return card;
	}

	/**
	 * Uses radix sort to sort hand. Only used when recreating game from commit log after crash
	 */
	sortHand() {
		const hand = this.hand;
		this.hand = radixSort(hand, (card) => card.id);
	}

	/**
	 * Captures a hand of cards
	 * @param {[Card]} hand
	 * @returns {[Card]} – Array of captured cards
	 */
	captureCards(hand = []) {
		const { captured } = this;
		for (let i = 0; i < hand; i++) {
			const card = hand[i];
			if (!card instanceof Card) {
				throw new Error(
					'All captured cards must be instances of the class Card',
				);
			} else {
				captured.push(card);
			}
		}
		return captured;
	}

	/**
	 * Clears all cards from this player
	 * @returns {True}
	 */
	clearCardsDangerously() {
		this.hand = [];
		this.captured = [];
		return true;
	}

	/**
	 * Clears cards only if the player's hand is empty
	 * @returns {Boolean}
	 */
	clearCardsSafely() {
		if (this.hand.length) return false;
		else return this.clearCardsDangerously();
	}
}

module.exports = Player;
