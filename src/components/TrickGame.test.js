const _ = require('lodash');
const TrickGame = require('./TrickGame');

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
});
