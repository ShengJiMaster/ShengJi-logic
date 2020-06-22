const _ = require('lodash');
const Game = require('./Game');

describe('Game', () => {
	describe('init', () => {
		it('should build', (done) => {
			const build = () => new Game();
			expect(build).not.toThrow(Error);
			done();
		});

		it('should requires minPlayers <= maxPlayers', (done) => {
			const buildErr = () => new Game(10, 0);
			expect(buildErr).toThrow(Error);
			done();
		});

		it('should configure deck', (done) => {
			const myGame = new Game(undefined, undefined, {
				nDecks: 2,
				deckOptions: { jokers: true },
			});

			const deck = myGame.deck;
			// expect(deck.n).toEqual
			done();
		});
	});

	describe('stopGameIfTooFewOrManyPlayers', () => {
		it('should throw error on too few players', (done) => {
			const myGame = new Game(4, 6);
			myGame.players = [1];
			const throwErr = () => myGame.stopGameIfTooFewOrManyPlayers();
			expect(throwErr).toThrow(Error);
			done();
		});

		it('should throw error on too many players', (done) => {
			const myGame = new Game(4, 6);
			myGame.players = _.range(10);
			const throwErr = () => myGame.stopGameIfTooFewOrManyPlayers();
			expect(throwErr).toThrow(Error);
			done();
		});
	});

	describe('addPlayer', () => {
		it('should add a new player', (done) => {
			const myGame = new Game(4);
			const res = myGame.addPlayer('player1');
			expect(res).toEqual(1);
			expect(myGame.players.length).toEqual(1);
			done();
		});

		it('should not require that a name was provided', (done) => {
			const myGame = new Game(4);
			const addRando = () => myGame.addPlayer();
			expect(addRando).not.toThrow(Error);
			done();
		});

		it('should require a unique name', (done) => {
			const myGame = new Game(4);
			const addTony = () => myGame.addPlayer('tony');
			addTony();
			expect(addTony).toThrow(Error);
			done();
		});

		it('should not add a player when there is no more room', (done) => {
			const myGame = new Game(2, 3);
			for (let i = 0; i < 5; i++) {
				myGame.addPlayer(String(i));
			}
			expect(myGame.players.length).toEqual(3);
			done();
		});
	});

	describe('removePlayer', () => {
		it('should remove an existing player from the game', (done) => {
			const myGame = new Game(4);
			myGame.addPlayer('tony');
			myGame.addPlayer('soprano');
			myGame.removePlayer('tony');
			expect(myGame.players.length).toEqual(1);
			done();
		});
	});

	describe('dealCards', () => {
		it('should check if game has the required number of players', (done) => {
			const myGame = new Game(4);
			for (let i = 0; i < 2; i++) myGame.addPlayer();
			const dealCards = () => myGame.dealCards(2);
			expect(dealCards).toThrow(Error);
			done();
		});

		it('should check if there are enough cards to deal nCards', (done) => {
			const myGame = new Game(4);
			for (let i = 0; i < 4; i++) myGame.addPlayer();
			const dealCards = () => myGame.dealCards(100);
			expect(dealCards).toThrow(Error);
			done();
		});

		it('should deal cards when asked nicely', (done) => {
			const nCards = 13;

			const myGame = new Game(4);
			for (let i = 0; i < 4; i++) myGame.addPlayer();
			const dealCards = () => myGame.dealCards(nCards);
			expect(dealCards).not.toThrow(Error);

			const players = myGame.players;
			for (let i = 0; i < players.length; i++) {
				const hand = players[i].hand;
				expect(hand.length).toEqual(nCards);
			}

			done();
		});
	});
});
