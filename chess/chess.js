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
    if (this.players.length < 2) {
      this.players.push(player);
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
}

module.exports = { ChessGame };