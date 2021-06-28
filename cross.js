let size = 3;

class CrossGame {
  constructor() {
    this.field = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.players = [];
    this.currentPlayerIndex = 0;
    this.signs = ['X', 'O'];
    this.winner = '';
    this.currentSign = this.signs[0];
  }

  getPlayers() {
    return this.players;
  }

  setPlayers(player) {
    if (this.players.length < 2) {
      this.players.push(player);
    }
  }

  setCurrentPlayer() {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
  }

  writeSignToField(player, coords) {
    if (this.players.length === 2) {
      if (!this.winner) {
        if (player === this.players[this.currentPlayerIndex]) {
          this.field[coords.y][coords.x] = this.signs[this.currentPlayerIndex];
          this.checkWinner(coords, this.signs[this.currentPlayerIndex]);
          this.currentSign = this.signs[this.currentPlayerIndex];
          this.setCurrentPlayer();
        }
      }
    }
  }

  getField() {
    return this.field;
  }

  getWinner() {
    return this.winner;
  }

  checkWinner(coords, sign) {
    let countHor = 1;
    let countVer = 1;
    let countDiagPrim = 1;
    let countDiagSec = 1;

    const { x: fromX, y: fromY } = coords;
    const moveHor = [{ x: -1, y: 0 }, { x: 1, y: 0 }];
    const moveVer = [{ x: 0, y: 1 }, { x: 0, y: -1 }];
    const moveDiagPrim = [{ x: -1, y: -1 }, { x: 1, y: 1 }];
    const moveDiagSec = [{ x: -1, y: 1 }, { x: 1, y: -1 }];

    moveHor.forEach((move) => {
      let toX = fromX;
      let toY = fromY;
      for (let i = 0; i < size; i++) {
        toX += move.x;
        toY += move.y;
        if (toY >= 0 && toY < size && toX >= 0 && toX < size) {
          if (this.field[toY][toX] === sign) {
            countHor++;
          } else break;
        }
      }
    });

    moveVer.forEach((move) => {
      let toX = fromX;
      let toY = fromY;
      for (let i = 0; i < size; i++) {
        toX += move.x;
        toY += move.y;
        if (toY >= 0 && toY < size && toX >= 0 && toX < size) {
          if (this.field[toY][toX] === sign) {
            countVer++;
          } else break;
        }
      }
    });

    moveDiagPrim.forEach((move) => {
      let toX = fromX;
      let toY = fromY;
      for (let i = 0; i < size; i++) {
        toX += move.x;
        toY += move.y;
        if (toY >= 0 && toY < size && toX >= 0 && toX < size) {
          if (this.field[toY][toX] === sign) {
            countDiagPrim++;
          } else break;
        }
      }
    });

    moveDiagSec.forEach((move) => {
      let toX = fromX;
      let toY = fromY;
      for (let i = 0; i < size; i++) {
        toX += move.x;
        toY += move.y;
        if (toY >= 0 && toY < size && toX >= 0 && toX < size) {
          if (this.field[toY][toX] === sign) {
            countDiagSec++;
          } else break;
        }
      }
    });
    if (countHor === size || countVer === size || countDiagPrim === size || countDiagSec === size) {
      this.winner = this.players[this.currentPlayerIndex];
      console.log(`Win! The player ${this.players[this.currentPlayerIndex]} wins the game`);
    }
  }

  clearData() {
    this.field = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.players = [];
    this.currentPlayerIndex = 0;
    this.winner = '';
  }

  getCurrentSign() {
    return this.currentSign;
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}

module.exports = { CrossGame };