const _ = require('lodash');
const Game = require('./Game');
const Player = require('./Player');

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

		it('should require a unique names', (done) => {
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
});
