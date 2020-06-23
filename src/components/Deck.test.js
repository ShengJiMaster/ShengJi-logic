const Deck = require('./Deck');
const Card = require('./Card');
const isSorted = require('util/isSorted');

describe('Deck', () => {
  describe('init', () => {
    const buildDeck = (n) => () => new Deck(n);

    it('should build without throwing error', (done) => {
      expect(buildDeck).not.toThrow(Error);
      done();
    });

    it('should validate n', (done) => {
      expect(buildDeck(0)).toThrow(Error);
      expect(buildDeck('str')).toThrow(Error);
      done();
    });

    it('should take n > 1', (done) => {
      for (let i = 2; i < 4; i++) {
        expect(buildDeck(i)).not.toThrow(Error);
      }
      done();
    });

    it('should take options', (done) => {
      const myDeck = new Deck(1, { jokers: true });
      const { options } = myDeck;
      expect(options.jokers).toBe(true);
      done();
    });
  });

  describe('buildNewDeck', () => {
    const oneDeck = new Deck();
    const oneDeckYesJk = new Deck(1, { jokers: true });
    it('should be called on init', (done) => {
      const { deck } = oneDeck;
      expect(deck.length).toBeGreaterThan(0);
      done();
    });

    it('should account for jokers', (done) => {
      const noJk = oneDeck.deck.length;
      const yesJk = oneDeckYesJk.deck.length;
      expect(noJk).toEqual(52);
      expect(yesJk).toEqual(54);
      done();
    });
  });

  describe('shuffle', () => {
    const oneDeck = new Deck();
    it('should be called on init', (done) => {
      const { deck } = oneDeck;
      const sorted = () => isSorted(deck, (card) => card.id);
      expect(sorted).toThrow(Error);
      done();
    });

    it('should change the deck', (done) => {
      const first = oneDeck.deck.map((x) => x.id).join(',');
      oneDeck.shuffle();
      const second = oneDeck.deck.map((x) => x.id).join(',');
      expect(first).not.toEqual(second);
      done();
    });
  });

  describe('drawCard', () => {
    it('should a Card', (done) => {
      const oneDeck = new Deck();
      for (let i = 0; i < 10; i++) {
        const draw = oneDeck.drawCard();
        expect(draw).toBeInstanceOf(Card);
      }
      done();
    });

    it('should remove the card from deck', (done) => {
      const oneDeck = new Deck();
      const deck = oneDeck.deck;
      const length = deck.length;
      for (let i = 0; i < 10; i++) {
        oneDeck.drawCard();
      }
      expect(deck.length + 10).toEqual(length);
      done();
    });
  });
});
