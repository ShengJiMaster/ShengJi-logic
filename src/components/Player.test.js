const _ = require('lodash');
const sinon = require('sinon');

const Card = require('./Card');
const Player = require('./Player');
const isSorted = require('util/isSorted');
const { spy } = require('sinon');

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

  describe('playCardGroupFromHand', () => {
    const hand = _.range(10).map((n) => new Card(n));
    const myPlayer = new Player();
    myPlayer.hand = hand.slice();
    const cardIndeces = [0, 2, 4];
    const table = [];
    let shouldBeCardGroup;
    const cardGroup = myPlayer.playCardGroupFromHand(
      cardIndeces,
      table,
      (x) => {
        shouldBeCardGroup = x;
        return x;
      },
    );

    it('should return the played cards', (done) => {
      expect(cardGroup.map((card) => card.id)).toEqual(cardIndeces);
      done();
    });

    it('should push the played cards to a provided table', (done) => {
      expect(table[0]).toEqual(cardGroup);
      done();
    });

    it('should remove the cards from the players hand', (done) => {
      expect(myPlayer.hand).not.toEqual(expect.arrayContaining(cardGroup));
      done();
    });

    it('should invoke parseCardGroup on cardGroup', (done) => {
      expect(shouldBeCardGroup).toEqual(cardGroup);
      done();
    });
    const anotherGuy = new Player();
    anotherGuy.hand = _.range(15, 20).map((n) => new Card(n));
    const prevHand = anotherGuy.hand.slice();

    it('should throw an error if any of teh cardIndeces are invalid', (done) => {
      const playCardGroup = () => anotherGuy.playCardGroupFromHand([0, 1, 999]);
      expect(playCardGroup).toThrow(Error);
      done();
    });

    it('should not play any cards if at least one of the cardIndeces is valid', (done) => {
      expect(anotherGuy.hand).toEqual(prevHand);
      done();
    });
  });

  describe('playCardOrGroupFromHand', () => {
    const myPlayer = new Player();
    myPlayer.hand = _.range(3).map((n) => new Card(n));
    const spySingular = sinon.spy(myPlayer, 'playCardFromHand');
    const spyPlural = sinon.spy(myPlayer, 'playCardGroupFromHand');

    it('should invoke playCardFromHand with a number', (done) => {
      myPlayer.playCardOrGroupFromHand(0);
      expect(spySingular.callCount).toEqual(1);
      expect(spyPlural.callCount).toEqual(0);
      done();
    });

    it('should invoke playCardGroupFromHand with a number', (done) => {
      myPlayer.playCardOrGroupFromHand([0, 1]);
      expect(spySingular.callCount).toEqual(1);
      expect(spyPlural.callCount).toEqual(1);
      done();
    });
  });

  describe('sortHand', () => {
    const guy = new Player();
    guy.hand = _.shuffle(_.range(10).map((n) => new Card(n)));

    guy.sortHand();
    it('should sort a shuffled hand', (done) => {
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });
  });

  describe('sortHandAndClean', () => {
    const guy = new Player();
    guy.hand = _.shuffle(_.range(10).map((n) => new Card(n)));
    guy[5] = null;
    guy[7] = 'tony';
    guy.sortHandAndClean();

    it('should sort a shuffled hand', (done) => {
      const checkSort = () => isSorted(guy.hand, (x) => x.id);
      expect(checkSort).not.toThrow(Error);
      done();
    });

    it('should remove all non-Cards from hand', (done) => {
      expect(guy.hand).not.toEqual(expect.arrayContaining([null]));
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
