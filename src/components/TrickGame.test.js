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

  describe('trickWinner', () => {
    const myGame = new TrickGame(4);
    const whoStartsRound = 2;
    myGame.whoStartsRound = whoStartsRound;
    myGame.trumpRank = 5;
    myGame.trumpSuit = 2;
    for (let i = 0; i < 4; i++) myGame.addPlayer();
    myGame.table = _.range(4).map((n) => new Card(n));
    myGame.table[0] = new Card(36);

    const checkWinner = () => myGame.trickWinner;

    it('should identify a trump', (done) => {
      let ans;
      expect(() => {
        ans = checkWinner();
      }).not.toThrow(Error);
      expect(ans).toEqual(0);
      done();
    });
  });
});
