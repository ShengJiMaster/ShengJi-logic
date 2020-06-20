const _ = require('lodash');
const Card = require('./Card');
const CardPlayer = require('./CardPlayer');
const isSorted = require('util/isSorted');

describe('CardPlayer', () => {
	describe('bubbleSortLastCard', () => {
		it('should sort the last card', (done) => {
			const guy = new CardPlayer();
			guy.hand = _.range(5, 10).map((n) => new Card(n));
			guy.hand.push(new Card(0));
			guy.bubbleSortLastCard();
			const checkSort = () => isSorted(guy.hand, (x) => x.id);
			expect(checkSort).not.toThrow(Error);
			done();
		});
	});

	describe('addCardToHand', () => {
		it('should sort added card into hand', (done) => {
			const guy = new CardPlayer();
			for (let i = 10; i > 0; i--) {
				const card = new Card(i);
				guy.addCardToHand(card);
			}
			const checkSort = () => isSorted(guy.hand, (x) => x.id);
			expect(checkSort).not.toThrow(Error);
			done();
		});
	});

	describe('playCardFromHand', () => {
		const guy = new CardPlayer();
		for (let i = 10; i >= 0; i--) {
			const card = new Card(i);
			guy.addCardToHand(card);
		}

		it('should remove card from hand', (done) => {
			const len = guy.hand.length;
			const [card] = guy.playCardFromHand(1);
			expect(card.id).toEqual(1);
			expect(guy.hand.length).toEqual(len - 1);
			done();
		});

		it('should still have a sorted hand', (done) => {
			const checkSort = () => isSorted(guy.hand, (x) => x.id);
			expect(checkSort).not.toThrow(Error);
			done();
		});
	});

	describe('sortHand', () => {
		it('should sort a shuffled hand', (done) => {
			const guy = new CardPlayer();
			guy.hand = _.shuffle(_.range(10).map((n) => new Card(n)));
			guy.sortHand();
			const checkSort = () => isSorted(guy.hand, (x) => x.id);
			expect(checkSort).not.toThrow(Error);
			done();
		});
	});

	describe('captureCards', () => {
		it('should catch some cards without error', (done) => {
			const cards = _.range(10).map((n) => new Card(n));
			const guy = new CardPlayer();
			const check = () => guy.captureCards(cards);
			expect(check).not.toThrow(Error);
			done();
		});
	});

	describe('clearCardsDangerously', () => {
		it('should delete all cards', (done) => {
			const guy = new CardPlayer();
			guy.hand = _.range(10).map((n) => new Card(n));
			guy.captured = _.range(10).map((n) => new Card(n));
			guy.clearCardsDangerously();
			expect(guy.hand.length).toEqual(0);
			expect(guy.captured.length).toEqual(0);
			done();
		});
	});
});
