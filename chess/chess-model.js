const { Vector } = require("./vector");

class CellModel {
  constructor(figureType) {
    let color = figureType.toLowerCase() == figureType ? 0 : 1;
    this.figure = createFigure(figureType.toLowerCase(), color);
  }
}

function createFigure(type, color) {
  const figures = new Map([
    ['p', Pawn],
    ['l', Rook],
    ['n', Knight],
    ['e', Bishop],
    ['q', Queen],
    ['k', King],
  ]);
  let FigureClass = figures.get(type);

  return FigureClass ? new FigureClass(color) : null;
}

class FigureModel {
  constructor(color) {
    this.color = color;
  }

  isChecked(field) {

    return false;
  }

  checkMove(field, fromX, fromY, toX, toY) {
    let allowed = this.getMoves(field, fromX, fromY);
    let isAllowed = allowed.findIndex(ax => ax.x === toX && ax.y === toY) === -1 ? false : true;
    return isAllowed;
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    return res;
  }
}

class Pawn extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'p';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let direction = (this.color === 0 ? 1 : -1);
    let posX = fromX + direction;
    let posY = fromY;
    if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
      res.push({ x: posX, y: posY });
    }

    if ((fromX === 6 && this.color === 1) || (fromX === 1 && this.color === 0)) {
      posX = fromX + direction;
      posY = fromY;
      if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
        posX = fromX + direction * 2;
        posY = fromY;
        if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
          res.push({ x: posX, y: posY });
        }
        //res.push({x:posX, y:posY});
      }
    }

    posX = fromX + direction;
    posY = fromY + 1;
    if (field[posX] && field[posX][posY] && (field[posX][posY].figure !== null && field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
      res.push({ x: posX, y: posY });
    }
    posX = fromX + direction;
    posY = fromY - 1;
    if (field[posX] && field[posX][posY] && (field[posX][posY].figure !== null && field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
      res.push({ x: posX, y: posY });
    }
    return res;
  }
}

class Rook extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'l';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let moves = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

    moves.forEach(move => {
      let posX = fromX;
      let posY = fromY;
      for (let i = 0; i < 10; i++) {
        posX += move.x;
        posY += move.y;
        if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null || field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
          if (field[posX][posY].figure !== null) {
            res.push({ x: posX, y: posY });
            break;
          } else {
            res.push({ x: posX, y: posY });
          }
        } else {
          break;
        }
      }
    });
    return res;
  }
}

class Knight extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'n';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let moves = [
      { x: 2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: 1 },
      { x: -2, y: -1 },
      { x: 1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: 2 },
      { x: -1, y: -2 }
    ];

    moves.forEach(move => {
      let posX = fromX + move.x;
      let posY = fromY + move.y;
      if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null || field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
        res.push({ x: posX, y: posY });
      }
    });
    return res;
  }
}

class Bishop extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'e';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let moves = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }];

    moves.forEach(move => {
      let posX = fromX;
      let posY = fromY;
      for (let i = 0; i < 10; i++) {
        posX += move.x;
        posY += move.y;
        if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null || field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
          if (field[posX][posY].figure !== null) {
            res.push({ x: posX, y: posY });
            break;
          } else {
            res.push({ x: posX, y: posY });
          }
        } else {
          break;
        }
      }
    });
    return res;
  }
}

class Queen extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'q';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let moves = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 },
    { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

    moves.forEach(move => {
      let posX = fromX;
      let posY = fromY;
      for (let i = 0; i < 10; i++) {
        posX += move.x;
        posY += move.y;
        if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null || field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
          if (field[posX][posY].figure !== null) {
            res.push({ x: posX, y: posY });
            break;
          } else {
            res.push({ x: posX, y: posY });
          }
        } else {
          break;
        }
      }
    });
    return res;
  }
}

class King extends FigureModel {
  constructor(color) {
    super(color);
    this.type = 'k';
  }

  getMoves(field, fromX, fromY) {
    let res = [];
    let moves = [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 },
    { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

    moves.forEach(move => {
      let posX = fromX + move.x;
      let posY = fromY + move.y;
      if (field[posX] && field[posX][posY] && (field[posX][posY].figure === null || field[posX][posY].figure.color !== this.color) && posY >= 0 && posY < 8 && posX >= 0 && posX < 8) {
        res.push({ x: posX, y: posY });
      }
    });
    return res;
  }
}

//  type FieldState = Array<Array<CellModel>>;

class FieldModel {

  constructor() {

  }

  setAllowed() {

  }

  logicMove(func) {
    let froms = this.getAllowedFromsE(this.state, this.currentColor);
    if (!froms.length) {
      console.log("END");
      return;
    }

    let max = 0;
    let maxFrom;
    let maxTo;
    froms.forEach((fig) => {
      let avals = this.getAllowed(this.state, fig.x, fig.y);
      avals.forEach(mov => {
        let newState = this.getStateAfterMove(this.state, fig.x, fig.y, mov.x, mov.y);
        let val = func(this.state, newState);
        if (max < val) {
          max = val;
          maxFrom = new Vector(fig.x, fig.y);
          maxTo = new Vector(mov.x, mov.y)
        };
      })
    });
    this.move(maxFrom.x, maxFrom.y, maxTo.x, maxTo.y);
  }

  randomMove() {
    let froms = this.getAllowedFromsE(this.state, this.currentColor);
    if (!froms.length) {
      console.log("END");
    }
    let from = froms[Math.floor(Math.random() * froms.length)];
    if (from) {
      let avals = this.getAllowed(this.state, from.x, from.y);//this.state[from.x][from.y].figure.getMoves(this.state, from.x, from.y);
      let aval = avals[Math.floor(Math.random() * avals.length)];
      if (aval) {
        this.move(from.x, from.y, aval.x, aval.y);
      }
    }
  }

  logic(cur, next) {
    let curBotFigCount = 0;
    this.forEachPlayerFigure(cur, this.currentColor, (cell) => {
      curBotFigCount++;
    })
    let nextBotFigCount = 0;
    this.forEachPlayerFigure(next, this.currentColor, (cell) => {
      nextBotFigCount++;
    })

    let curPlayerFigCount = 0;
    this.forEachPlayerFigure(cur, (this.currentColor + 1) % 2, (cell) => {
      curPlayerFigCount++;
    })
    let nextPlayerFigCount = 0;
    this.forEachPlayerFigure(next, (this.currentColor + 1) % 2, (cell) => {
      nextPlayerFigCount++;
    })
    /*if (curBotFigCount== nextBotFigCount){
      return 2;
    }*/
    if (curPlayerFigCount > nextPlayerFigCount) {
      return Math.random() * 5 + 6;
    }
    return Math.random() * 5 + 1;
  }

  move(fromX, fromY, toX, toY) {
    let allowed = (this.getAllowed(this.state, fromX, fromY));
    let isAllowed = allowed.findIndex(it => {
      return (it.x == toX && it.y == toY);
    });
    if (isAllowed == -1) {
      return;
    }
    if (this.state[fromX][fromY].figure && this.state[fromX][fromY].figure.color === this.currentColor && this.state[fromX][fromY].figure.checkMove(this.state, fromX, fromY, toX, toY)) {
      //console.log('moved')
      this.state[toX][toY].figure = this.state[fromX][fromY].figure;
      this.state[fromX][fromY].figure = null;
      this.setState(this.state);
      this.currentColor = (this.currentColor + 1) % 2;
      //console.log(this.currentColor, this.getCheckedKing(this.state));
      if (this.currentColor === 0) {
        //this.randomMove();
        this.logicMove((cur, next) => {
          return this.logic(cur, next);
        });
      }
    }
  }

  getStateAfterMove(state_, fromX, fromY, toX, toY) {
    let state = this.cloneState(state_);
    this.exchangePositions(state, new Vector(fromX, fromY), new Vector(toX, toY));
    return state;
  }

  getAllowedFroms(state, color, type) {
    let res = [];
    this.forEachPlayerFigure(state, color, (cell, pos) => {
      if (cell.figure.getMoves(state, pos.x, pos.y).length) {
        if (type) {
          if (type == cell.figure.type.toLowerCase()) {
            res.push(pos);
          }
        } else {
          res.push(pos);
        }
      };
    })
    return res;
  }

  exchangePositions(state, from, to) {
    this.getCellAt(state, to).figure = this.getCellAt(state, from).figure;
    this.getCellAt(state, from).figure = null;
  }

  forEachCell(state, callback) {
    state.forEach((it, i) => {
      it.forEach((jt, j) => {
        callback(jt, new Vector(i, j));
      });
    });
  }

  forEachPlayerFigure(state, playerColor, callback) {
    this.forEachCell(state, (cell, pos) => {
      if (cell.figure && cell.figure.color === playerColor) {
        callback(cell, pos);
      }
    });
  }

  getCellAt(state, pos) {
    return state[pos.x][pos.y];
  }

  cloneState(state) {
    let newState = state.map(it => {
      return it.map(jt => {
        let newCell = new CellModel(jt.figure ? jt.figure.type : ' ');
        if (newCell.figure) {
          newCell.figure.color = jt.figure.color;
        }
        return newCell;
      });
    });
    return newState;
  }

  getAllowedFromsE(state, color, type) {
    let res = [];
    state.forEach((it, i) => {
      it.forEach((jt, j) => {
        if (jt.figure && jt.figure.color == color) {
          //if (jt.figure.getMoves(state, i, j).length){
          if (this.getAllowed(state, i, j).length) {
            if (type) {
              //console.log(i, j)
              if (type == jt.figure.type.toLowerCase()) {
                res.push({ x: i, y: j });
              }
            } else {
              res.push({ x: i, y: j });
            }
          };
        }
      })
    })
    return res;
  }

  getKingPos(state, color) {
    let res = null;
    this.forEachPlayerFigure(state, color, (cell, pos) => {
      if (cell.figure.type == 'k') {
        res = pos;
      }
    });
    return res;
  }

  getCheckedKing(state) {
    //console.log(this.getAllowedFroms(this.currentColor));
    let kingPos = this.getKingPos(state, this.currentColor);
    return this.getCheckedStatus(state, kingPos.x, kingPos.y);
  }


  getCheckedStatus(state, posX, posY) {
    let res = false;
    let enemies = this.getAllowedFroms(state, (this.currentColor + 1) % 2);
    enemies.forEach(enemy => {
      let allowed = this.getAllowedE(state, enemy.x, enemy.y);
      allowed.forEach(al => {
        //console.log(al);
        if (al.x === posX && al.y === posY) {
          res = true;
        }
      })
    })
    return res;
  }

  getAllowed(state, fromX, fromY) {
    if (state[fromX][fromY].figure && state[fromX][fromY].figure.color === this.currentColor) {

      let moves = state[fromX][fromY].figure.getMoves(state, fromX, fromY);
      moves = moves.filter(it => {
        let nextState = this.getStateAfterMove(state, fromX, fromY, it.x, it.y);
        return !this.getCheckedKing(nextState);
      })
      return moves;
    } else {
      return [];
    }
  }

  getAllowedE(state, fromX, fromY) {
    if (state[fromX][fromY].figure && state[fromX][fromY].figure.color !== this.currentColor) {

      return state[fromX][fromY].figure.getMoves(state, fromX, fromY);
    } else {
      return [];
    }
  }

  setFromStrings(stringState) {
    let newState = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push(new CellModel(stringState[i][j]));
      }
      newState.push(row);
    }
    this.setState(newState);
  }

  setState(newState) {
    this.state = newState;
    // this.onChange.emit(newState);
  }
}

module.exports = { FieldModel }