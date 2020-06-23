const Deck = require('./Deck');
const Player = require('./Player');

class Game {
  /**
   * Constructor for the class Game
   * @param {Number} nDecks – Number of decks to be played with
   * @param {Number} minPlayers – Minimum number of players required
   * @param {Object=defaultOptions} options
   */
  constructor(minPlayers = 1, maxPlayers = minPlayers, options = {}) {
    if (typeof minPlayers !== 'number' || typeof maxPlayers !== 'number') {
      throw new Error(
        `minPlayers and maxPlayers must be numbers;
        received: minPlayers=${minPlayers}; maxPlayers=${maxPlayers}`,
      );
    }

    if (minPlayers > maxPlayers) {
      throw new Error(
        `Must have minPlayers <= maxPlayers;
          received: minPlayers=${minPlayers}; maxPlayers=${maxPlayers}`,
      );
    }

    const defaultOptions = {
      nDecks: 1,
      deckOptions: {},
    };

    options = Object.assign({}, defaultOptions, options);
    this.options = options;
    this.minPlayers = minPlayers;
    this.maxPlayers = maxPlayers;
    this.players = [];
    this.table = [];
    this.deck = new Deck(options.nDecks, options.deckOptions);
  }

  /**
   * Checks if the game has enough players
   * @returns {Boolean}
   */
  get hasTooFewPlayers() {
    const { minPlayers, players } = this;
    return players.length < minPlayers;
  }

  /**
   * Checks if the game has too many players
   * @returns {Boolean}
   */
  get hasTooManyPlayers() {
    const { maxPlayers, players } = this;
    return maxPlayers < players.length;
  }

  /**
   * Stops the game if the number of players is too few or too many by throwing error
   */
  stopGameIfTooFewOrManyPlayers() {
    const {
      minPlayers,
      maxPlayers,
      players,
      hasTooFewPlayers,
      hasTooManyPlayers,
    } = this;
    if (hasTooFewPlayers || hasTooManyPlayers) {
      throw new Error(
        `Game requires ${minPlayers}<= nPlayers <=${maxPlayers}; received nPlayers=${players.length}`,
      );
    }
  }

  /**
   * Checks if the game can accept another player
   * @returns {Boolean}
   */
  get canAddAnotherPlayer() {
    const { maxPlayers, players } = this;
    return players.length < maxPlayers;
  }

  /**
   * Adds a player to the game, if there is enough room
   * @param {String} name
   * @returns {Number} – the new number of players
   */
  addPlayer(name) {
    const { players, canAddAnotherPlayer } = this;
    if (!canAddAnotherPlayer) return;
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        const names = players.map((p) => p.name);
        throw new Error(
          `Game.addPlayer(name): name must be unique; received=${name}; preexisting playerNames=${names}`,
        );
      }
    }
    const player = new Player(name);
    players.push(player);
    return player;
  }

  /**
   * Removes a player from the game
   * @param {String} name
   * @returns {Player} – the removed player
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
   * Deals the cards on table to the players
   * @param {Number} nCards – number of cards to deal to each player
   */
  dealCards(nCards) {
    this.stopGameIfTooFewOrManyPlayers();
    const { players, deck } = this;
    if (deck.deck.length < nCards * players.length)
      throw new Error(
        `There are not enough cards left (deck.length=${deck.deck.length}) to deal nCards=${nCards} to ${players.length} players in this game`,
      );

    // deal cards
    for (let c = 0; c < nCards; c++) {
      for (let p = 0; p < players.length; p++) {
        const player = players[p];
        const card = deck.drawCard();
        player.addCardToHand(card);
      }
    }
  }

  /**
   * @param {*} player
   */
  throwErrorIfNotInstanceOfPlayer(player) {
    if (!(player instanceof Player)) {
      throw new Error(
        `The provided argument must be instance of Player; received type=${typeof player}; val=${player}`,
      );
    }
  }

  /**
   * Plays a card from a player's hand to the table
   * @param {Number} playerIndex – the index of the player in Game.players
   * @param {Number} cardIndex – the index of the card in Player.hand
   */
  playCardToTable(playerIndex, cardIndex) {
    this.stopGameIfTooFewOrManyPlayers();
    const { table, players } = this;
    const player = players[playerIndex];
    this.throwErrorIfNotInstanceOfPlayer(player);
    return player.playCardFromHand(cardIndex, table);
  }

  /**
   * A specified player captures all the cards on the table
   * @param {Number} playerIndex – the index of the player in Game.players
   */
  captureCardsForPlayer(playerIndex) {
    this.stopGameIfTooFewOrManyPlayers();
    const { table, players } = this;
    const player = players[playerIndex];
    this.throwErrorIfNotInstanceOfPlayer(player);
    return player.captureCards(table);
  }

  /**Clears all cards from table and players; and rebuilds the deck */
  restartGameDangerously() {
    const { players, deck } = this;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.clearCardsDangerously();
    }
    this.table = [];
    deck.initialize();
  }

  /**Only restarts game IF no player has any cards left */
  restartGameSafely() {
    const { players } = this;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.hand.length) {
        throw new Error(
          `Cannot restart game. player${i} with name=${player.name} still has cards in hand`,
        );
      }
    }
    this.restartGameDangerously();
  }
}

module.exports = Game;
