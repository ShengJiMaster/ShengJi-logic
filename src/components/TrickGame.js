const Game = require('./Game');

class TrickGame extends Game {
  constructor(minPlayers = 1, maxPlayers = minPlayers, options = {}) {
    super(minPlayers, maxPlayers, options);
    this.whoStartsRound = null;
  }

  /** Cards are only played to the table when they becme apart of a trick
   * @returns {Object} – The table
   */
  get trick() {
    return this.table;
  }

  /**
   * Calculates index of whose turn it is to play, if any
   * @returns {Number}
   */
  get whosTurn() {
    const { nPlayers, whoStartsRound, table } = this;
    if (typeof whoStartsRound !== 'number') return;
    if (table.length >= nPlayers) return null;
    return whoStartsRound + table.length;
  }

  /**
   * Invokes playCardToTable ONLY IF it's that player's turn to play cards to the table
   * @param {Number} playerIndex
   * @param {Number | [Number]} cardIndeces
   */
  playCardOrGroupToTrick(playerIndex, cardIndeces) {
    const { whosTurn } = this;
    if (whosTurn !== playerIndex) return;
    return this.playCardOrGroupToTable(playerIndex, cardIndeces);
  }

  get trickWinner() {}
}

module.exports = TrickGame;
