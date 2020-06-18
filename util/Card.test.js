const Card = require('./Card');
const Suits = require('./Suits');
const Nums = require('./Nums');

describe('Card', () => {
	const buildCard = (num, suit, cb = () => {}) => () => {
		const card = new Card(num, suit);
		cb(card);
		return card;
	};

	it('should create every card without error', (done) => {
		for (let n = 2; n < 15; n++) {
			for (let s = 0; s < 4; s++) {
				expect(buildCard(n, s)).not.toThrow(Error);
			}
		}
		done();
	});

	it('can create jokers without suits', (done) => {
		expect(buildCard(15, null)).not.toThrow(Error);
		expect(buildCard(16, null)).not.toThrow(Error);
		done();
	});

	it('cannot create standard cards with suit joker', (done) => {
		expect(buildCard(5, 4)).toThrow(Error);
		expect(buildCard(6, 4)).toThrow(Error);
		done();
	});

	it('should throw bad nums', (done) => {
		expect(buildCard(1)).toThrow(Error);
		expect(buildCard(20)).toThrow(Error);
		expect(buildCard(-5)).toThrow(Error);
		done();
	});

	it('should throw bad suits', (done) => {
		expect(buildCard(5)).toThrow(Error);
		expect(buildCard(20)).toThrow(Error);
		expect(buildCard(-5)).toThrow(Error);
		done();
	});
});
