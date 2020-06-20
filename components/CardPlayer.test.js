const Card = require('./Card');
const CardPlayer = require('./CardPlayer');
const _ = require('lodash');

describe('CardPlayer', () => {
	describe('bubbleSortLastCard', () => {
		it('should', (done) => {
			const guy = new CardPlayer();
			guy.deck = _.range(5, 10).map((n) => new Card(n));
			guy.deck.push(new Card(0));
			guy.bubbleSortLastCard();
			done();
		});
	});

	describe('addCardToHand', () => {});
	describe('playCardFromHand', () => {});
	describe('sortHand', () => {});
	describe('captureCards', () => {});
});
