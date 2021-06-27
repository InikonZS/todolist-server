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

  changePlayer(player, coords) {
    if (this.players.length === 2) {
      if (!this.winner) {
        if (player === this.players[this.currentPlayerIndex]) {
          const figCoords = JSON.parse(coords);
          // let oldCell = this.field[figCoords[0].y][figCoords[0].x];
          // console.log('oldCell', oldCell);
          // if (oldCell) {
          //   this.field[figCoords[1].y][figCoords[1].x] = oldCell;
          //   this.field[figCoords[0].y][figCoords[0].x] = '';
          //   console.log(this.field, oldCell);
          //   this.setCurrentPlayer();
          // }
          this.setCurrentPlayer();
          // this.field[coords.y][coords.x] = this.signs[this.currentPlayerIndex];
          // this.checkWinner(coords, this.signs[this.currentPlayerIndex]);
          // this.currentSign = this.signs[this.currentPlayerIndex];

        }
      }
    }
  }

  getAllowedMoves() {
    return [{ x: 0, y: 5 }, { x: 0, y: 4 }]
  }

  clearData() {
    this.players = [];
    this.currentPlayerIndex = 0;
    this.winner = '';
    this.model.setFromStrings(initialField);
    this.model.clearData();
  }

  getField() {
    return this.fen;
  }

  getMockField() {
    return this.mockFen;
  }

}

module.exports = { ChessGame };