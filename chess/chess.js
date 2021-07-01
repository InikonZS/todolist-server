const { FieldModel } = require("./chess-model");

const initialField = [
  'lneqkenl',
  'pppppppp',
  '        ',
  '        ',
  '        ',
  '        ',
  'PPPPPPPP',
  'LNEQKENL',
];

class ChessGame {
  constructor() {
    this.model = new FieldModel();
    this.model.setFromStrings(initialField);

    this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    this.mockFen = '1k6/8/3K4/8/8/7B/6Q1/8;'
    // this.field = initialField;
    this.players = [];
    this.currentPlayerIndex = 0;
    this.winner = '';
    this.gameMode = '';
  }

  setPlayers(player) {
    console.log('mode: ', this.gameMode, 'player: ', player);

    if (this.players.length === 0) {
      this.players.push(player);
      console.log('1', this.players);
    } else if (this.gameMode === 'network' && this.players.length === 1) {
      this.players.push(player);
      console.log('2', this.players);
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  setCurrentPlayer() {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  changePlayer(player) {
    if (this.players.length === 2) {
      if (player === this.players[this.currentPlayerIndex]) {
        this.setCurrentPlayer();
      }
    }
  }

  clearData() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.gameMode = '';
    this.model.setFromStrings(initialField);
    this.model.clearData();
  }

  getField() {
    return this.fen;
  }

  getPlayersLength() {
    return this.players.length;
  }

  setGameMode(gameMode) {
    this.gameMode = gameMode;
  }

  getPlayers() {
    return this.players;
  }

  getGameMode() {
    return this.gameMode;
  }
}

module.exports = { ChessGame };