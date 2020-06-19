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

		it('should throw errors on non-numbers id', (done) => {
			expect(buildCard('string')).toThrow(Error);
			done();
		});

		it('should throw errors on ids outside bounds', (done) => {
			expect(buildCard(54)).toThrow(Error);
			expect(buildCard(-1)).toThrow(Error);
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
				suit: 'joker',
			};
			const jokerLG = {
				id: 53,
				rank: 'lg',
				suit: 'joker',
			};

			expect(new Card(52).verbose).toMatchObject(jokerSM);
			expect(new Card(53).verbose).toMatchObject(jokerLG);
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

	describe('toTrickRank', () => {
		const { maxTrickRank } = new Card(0);
		it('should handle both jokers', (done) => {
			expect(new Card(53).toTrickRank()).toEqual(maxTrickRank);
			expect(new Card(52).toTrickRank()).toEqual(maxTrickRank - 1);
			done();
		});

		it('should handle card that is trumpRank and trumpSuit', (done) => {
			for (let i = 0; i < 52; i++) {
				const r = i % 13;
				const s = (i - r) / 13;
				const rank = new Card(i).toTrickRank(0, s, r);
				expect(rank).toEqual(maxTrickRank - 2);
			}
			done();
		});

		it('should handle trumpRank NOT trumpSuit', (done) => {
			for (let i = 0; i < 52; i++) {
				const r = i % 13;
				const s = (i - r) / 13;
				const ts = s === 3 ? 0 : s + 1;
				const rank = new Card(i).toTrickRank(0, ts, r);
				expect(rank).toEqual(maxTrickRank - 3);
			}
			done();
		});

		it('should handle trumpSuit NOT trumpRank', (done) => {
			for (let i = 0; i < 52; i++) {
				const r = i % 13;
				const tr = r === 12 ? 0 : r + 1;
				const s = (i - r) / 13;
				const rank = new Card(i).toTrickRank(0, s, tr);
				expect(rank).toEqual(14 + r);
			}
			done();
		});

		it('should handle leadSuit NO trump status', (done) => {
			for (let i = 0; i < 52; i++) {
				const r = i % 13;
				const tr = r === 12 ? 0 : r + 1;
				const s = (i - r) / 13;
				const ts = s === 3 ? 0 : s + 1;
				const rank = new Card(i).toTrickRank(s, ts, tr);
				expect(rank).toEqual(r + 1);
			}
			done();
		});

		it('should handle NO leadSuit NO trump', (done) => {
			for (let i = 0; i < 52; i++) {
				const r = i % 13;
				const tr = r === 12 ? 0 : r + 1;
				const s = (i - r) / 13;
				const ts = s === 3 ? 0 : s + 1;
				const rank = new Card(i).toTrickRank(ts, ts, tr);
				expect(rank).toEqual(0);
			}
			done();
		});
	});
});
