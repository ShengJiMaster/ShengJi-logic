const Card = require('./Card');

describe('Card', () => {
	const buildCard = (id, cb = () => {}) => () => cb(new Card(id));
	describe('init', () => {
		it('should create cards 0-53 without throwing error', (done) => {
			for (let i = 0; i < 54; i++) {
				expect(buildCard(i)).not.toThrow(Error);
			}
			done();
		});
	});

	describe('verbose', () => {
		const { ranks, suits } = new Card(0);

		it('should describe all standard ranks', (done) => {
			for (let i = 0; i < 52; i++) {
				const test = buildCard(i, (x) => {
					const r = i % 13;
					const rank = ranks[r];
					const match = { id: i, rank };
					const actual = x.verbose;
					expect(actual).toMatchObject(match);
				});
				test();
			}
			done();
		});

		it('should describe both jokers', (done) => {
			const jokerSM = {
				id: 52,
				rank: 'sm',
			};

			expect(
				buildCard(52, (x) => {
					expect(x.verbose).toMatchObject(jokerSM);
				}),
			);

			const jokerLG = {
				id: 53,
				rank: 'lg',
			};

			expect(
				buildCard(53, (x) => {
					expect(x.verbose).toMatchObject(jokerLG);
				}),
			);

			done();
		});

		it('should describe all suits', (done) => {
			for (let i = 0; i < 54; i++) {
				const test = buildCard(i, (x) => {
					const r = i % 13;
					const s = (i - r) / 13;
					const suit = suits[s];
					const match = { id: i, suit };
					const actual = x.verbose;
					expect(actual).toMatchObject(match);
				});
				test();
			}
			done();
		});
	});
});
