const _ = require('lodash');
const sinon = require('sinon');

const Card = require('./Card');
const Player = require('./Player');
const isSorted = require('util/isSorted');

describe('Player', () => {
  describe('init', () => {});

  describe('throwErrorIfNotInstanceOfCard', () => {
    const func = new Player().throwErrorIfNotInstanceOfCard;
    it('should know to throw err', (done) => {
      const testThrow = () => func({ name: 'not a card' });
      expect(testThrow).toThrow(Error);
      done();
    });

    it('should know not to throw err', (done) => {
      const testThrow = () => func(new Card(0));
      expect(testThrow).not.toThrow(Error);
      done();
    });
  });

  describe('bubbleSortLastCard', () => {
    it('should sort the last card', (done) => {
      const guy = new Player();
      guy.hand = _.range(5, 10).map((n) => new Card(n));
      guy.hand.push(new Card(0));
      guy.bubbleSortLastCard();
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });
  });

  describe('addCardToHand', () => {
    it('should sort added card into hand', (done) => {
      const guy = new Player();
      for (let i = 10; i > 0; i--) {
        const card = new Card(i);
        guy.addCardToHand(card);
      }
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });

    it('should claim ownership of cards added to hand', (done) => {
      const guy = new Player();
      for (let i = 10; i > 0; i--) {
        const card = new Card(i);
        guy.addCardToHand(card);
        expect(card.owner).toEqual(guy.name);
      }
      done();
    });
  });

  describe('playCardFromHand', () => {
    const guy = new Player();
    for (let i = 10; i >= 0; i--) {
      const card = new Card(i);
      guy.addCardToHand(card);
    }

    it('should remove card from hand', (done) => {
      const len = guy.hand.length;
      const card = guy.playCardFromHand(1);
      expect(card.id).toEqual(1);
      expect(guy.hand.length).toEqual(len - 1);
      done();
    });

    it('should still have a sorted hand', (done) => {
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });
  });

  describe('sortHand', () => {
    it('should sort a shuffled hand', (done) => {
      const guy = new Player();
      guy.hand = _.shuffle(_.range(10).map((n) => new Card(n)));
      guy.sortHand();
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });
  });

  describe('updateScoreWithCard', () => {
    const myPlayer = new Player();
    myPlayer.appraiseCard = () => 1;
    const spy = sinon.spy(myPlayer, 'appraiseCard');
    myPlayer.updateScoreWithCard(new Card(0));
    myPlayer.updateScoreWithCard(new Card(0));
    it('should call appraiseCard', (done) => {
      expect(spy.callCount).toEqual(2);
      done();
    });

    it('should update the score', (done) => {
      expect(myPlayer.score).toEqual(2);
      done();
    });
  });

  describe('captureCards', () => {
    it('should catch some cards without error', (done) => {
      const cards = _.range(10).map((n) => new Card(n));
      const guy = new Player();
      const check = () => guy.captureCards(cards);
      expect(check).not.toThrow(Error);
      done();
    });

    it('should call updateScoreWithCard', (done) => {
      const nCards = 10;
      const cards = _.range(nCards).map((n) => new Card(n));
      const guy = new Player();
      const spy = sinon.spy(guy, 'updateScoreWithCard');
      guy.captureCards(cards);
      expect(spy.callCount).toEqual(nCards);
      done();
    });
  });

  describe('clearCardsDangerously', () => {
    it('should delete all cards', (done) => {
      const guy = new Player();
      guy.hand = _.range(10).map((n) => new Card(n));
      guy.captured = _.range(10).map((n) => new Card(n));
      guy.clearCardsDangerously();
      expect(guy.hand.length).toEqual(0);
      expect(guy.captured.length).toEqual(0);
      done();
    });
  });
});
