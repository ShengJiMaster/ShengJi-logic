const Deck = require('./Deck');
const Player = require('./Player');

class Game {
	/**
	 * Constructor for the class Game
	 * @param {Number} nDecks – Number of decks to be played with
	 * @param {Number} minPlayers – Minimum number of players required
	 * @param {Object=defaultOptions} options
	 */
	constructor(minPlayers = 1, options = {}) {
		const defaultOptions = {
			nDecks: 1,
		};
		const options = Object.assign(defaultOptions, options);
		this.options = options;
		this.minPlayers = minPlayers;
		this.nDecks = nDecks;
		this.players = [];
		this.table = [];
		this.deck = new Deck(options.nDecks);
	}

	/**
	 * Checks whether or not the game has enough players
	 * @returns {Boolean}
	 */
	get hasEnoughPlayers() {
		const { minPlayers, players } = this;
		return minPlayers <= players.length;
	}

	/**
	 * Throws an error if there are not enough players to continue the game
	 */
	throwErrorIfNotEnoughPlayers() {
		const { minPlayers, players, hasEnoughPlayers } = this;
		if (hasEnoughPlayers) {
			throw new Error(
				`Game requires ${minPlayers} to player; received players=${players.length}`,
			);
		}
	}

	/**
	 * Adds a player to the game
	 * @param {String} name
	 */
	addPlayer(name) {
		const { players } = this;
		for (let i = 0; i < players.length; i++) {
			if (players[i].name === name) {
				const names = players.map((p) => p.name);
				throw new Error(
					`Game.addPlayer(name): name must be unique; received=${name}; preexisting playerNames=${names}`,
				);
			}
		}
		return players.push(player);
	}

	/**
	 * Removes a player from the game
	 * @param {String} name
	 */
	removePlayer(name) {
		const players = this.players;
		for (let i = 0; i < players.length; i++) {
			if (players[i].name === name) {
				return players.splice(i, 1);
			}
		}
	}

	/**
	 * Plays a card from a player's hand to the table
	 * @param {Number} playerIndex – the index of the player in Game.players
	 * @param {Number} cardIndex – the index of the card in Player.hand
	 */
	playCardToTable(playerIndex, cardIndex) {
		this.throwErrorIfNotEnoughPlayers();
		const { table, players } = this;
		const player = players[playerIndex];
		if (!player instanceof Player) return;
		return player.playCardToTable(cardIndex, table);
	}

	/**
	 * Specified player captures all the cards on the table
	 * @param {Number} playerIndex – the index of the player in Game.players
	 */
	captureCardsOnTable(playerIndex) {
		this.throwErrorIfNotEnoughPlayers();
		const { table, players } = this;
		const player = players[playerIndex];
		player.captureCards(table);
	}
}

module.exports = Game;
