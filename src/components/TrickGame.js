const Game = require('./Game');

class TrickGame extends Game {
  constructor(minPlayers = 1, maxPlayers = minPlayers, options = {}) {
    super(minPlayers, maxPlayers, options);
    this.whoStartsRound = null;
    this.trumpSuit = null;
    this.trumpRank = null;
  }

  /** Cards are only played to the table when they becme apart of a trick
   * @returns {Array}
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
   * Invokes playCardOrGroupToTable ONLY IF it's that player's turn
   * @param {Number} playerIndex
   * @param {Number | [Number]} cardIndeces
   * @returns {Card | [Card]} the played card or card group
   */
  playCardOrGroupToTrick(playerIndex, cardIndeces) {
    const { whosTurn } = this;
    if (whosTurn !== playerIndex) return;
    return this.playCardOrGroupToTable(playerIndex, cardIndeces);
  }

  /**
   * @return {Number} – the suit index of the card played by the player who started the round
   */
  get leadSuit() {
    const { trick, whoStartsRound } = this;
    if (!trick.length) return;
    return trick[whoStartsRound].s;
  }

  /**
   * @returns {Number} – playerIndex of winner
   */
  get trickWinner() {
    const { whosTurn, trick, leadSuit, trumpSuit, trumpRank } = this;
    if (whosTurn !== null) return;
    let winnerIndex;
    let maxVal = -1;
    for (let i = 0; i < trick.length; i++) {
      const card = trick[i];
      const val = card.toTrickRank(leadSuit, trumpSuit, trumpRank);
      if (val > maxVal) {
        maxVal = val;
        winnerIndex = i;
      }
    }
    return winnerIndex;
  }

  /**
   * Lets the trickWinner, if exists, capture all the cards on the table. Also lets trickWinner start the next round
   * @returns {[Card]} – the captured cards
   */
  winnerCaptureCards() {
    const { trickWinner, players, trick } = this;
    const player = players[trickWinner];
    if (!player) return;
    this.whoStartsRound = trickWinner;
    return player.captureCards(trick);
  }

  /**
   * The easiest function to use
   * @param {Number} playerIndex
   * @param {Number | [Number]} cardIndeces
   */
  playHand(playerIndex, cardIndeces) {
    const played = this.playCardOrGroupToTrick(playerIndex, cardIndeces);
    this.winnerCaptureCards();
    return played;
  }
}

module.exports = TrickGame;
