const _ = require('lodash');
const TrickGame = require('./TrickGame');
const Card = require('./Card');

describe('TrickGame', () => {
  describe('init', () => {
    it('should build', (done) => {
      const buildTrickGame = () => new TrickGame();
      expect(buildTrickGame).not.toThrow(Error);
      done();
    });
  });

  describe('whosTurn', () => {
    const myGame = new TrickGame(4);
    it('should return undefined without defined property whoStartsRound', (done) => {
      expect(myGame.whoTurn).toBe(undefined);
      done();
    });

    it('should recognize whos turn it is', (done) => {
      myGame.whoStartsRound = 0;
      myGame.players = _.range(4);
      for (let i = 0; i < 4; i++) {
        expect(myGame.whosTurn).toEqual(i);
        myGame.table.push(1);
      }
      done();
    });

    it('should return null when everyone has already played', (done) => {
      expect(myGame.whosTurn).toBe(null);
      done();
    });
  });

  describe('leadSuit', () => {
    const myGame = new TrickGame(4);
    myGame.whoStartsRound = 2;
    it('should return undefined if the table is empty', (done) => {
      expect(myGame.leadSuit).toBe(undefined);
      done();
    });

    it('should recognize the lead suit', (done) => {
      myGame.table = _.range(4);
      myGame.table[2] = new Card(7);
      expect(myGame.leadSuit).toEqual(0);
      done();
    });
  });

  const myWinningGame = new TrickGame(4);
  const whoStartsRound = 2;
  myWinningGame.whoStartsRound = whoStartsRound;
  myWinningGame.trumpRank = 5;
  myWinningGame.trumpSuit = 2;
  for (let i = 0; i < 4; i++) myWinningGame.addPlayer();
  myWinningGame.table = _.range(4).map((n) => new Card(n));
  myWinningGame.table[0] = new Card(36);

  describe('trickWinner', () => {
    const checkWinner = () => myWinningGame.trickWinner;
    it('should identify a trump', (done) => {
      let ans;
      expect(() => {
        ans = checkWinner();
      }).not.toThrow(Error);
      expect(ans).toEqual(0);
      done();
    });
  });

  describe('winnerCaptureCards', () => {
    it('should give the cards to the winner', (done) => {
      const winner = myWinningGame.players[myWinningGame.trickWinner];
      const cards = _.flatten(myWinningGame.table);
      myWinningGame.winnerCaptureCards();
      expect(winner.captured).toEqual(cards);
      done();
    });
  });
});
