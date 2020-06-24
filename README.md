# ShengJi Game Logic

#### Master

[![Build Status](https://travis-ci.org/ShengJiMaster/game-logic.svg?branch=master)](https://travis-ci.org/ShengJiMaster/game-logic)

Modular game logic for <b>ShengJi</b>, the classic Chinese trick-taking card game!

### Modules

- **Card**
  - **Single** extends Card (todo)
  - **Double** extends Card (todo)
  - **ConsecutiveDoubles** extends Card (todo)
  - **UnbeatableCombination** extends Card (todo)
- **Deck** uses Card
- **Player**
- **Game** uses Deck and Player. Enables cards to flow from the Deck to players; and also between players and the game table
  - **TrickGame** extends Game. Regulates the exchange of cards based on whose turn it is to play
    - **_ShengJiGame_** extends TrickGame (todo)

### Dependencies

- lodash

### Sources

- [zhao peng you](https://www.zhao-pengyou.com/)
- [Wikipedia](https://en.wikipedia.org/wiki/Sheng_ji)
