import { CellCoord } from './cell-coord';
import { CellCoords } from './cell-coords';
import { ChessColor } from './chess-color';
import { COMMON } from './common';
import { Figures } from './figures';
import { ICellCoord } from './icell-coord';
import { IField } from './ifield';
import { IFigure } from './ifigure';
import { IPosition } from './iPosition';
import { Moves } from './moves';
import { Position } from './position';

export class Field implements IField {
  private position: IPosition;
  readonly playerColor: ChessColor;
  readonly isShortWhiteCastling: boolean;
  readonly isLongWhiteCastling: boolean;
  readonly isShortBlackCastling: boolean;
  readonly isLongBlackCastling: boolean;
  readonly pawnTresspassing: CellCoord | null;
  readonly fiftyRuleCount: number;
  readonly moveNumber: number;
  readonly cost: number;

  constructor(
    position: IPosition,
    playerColor: ChessColor,
    isShortWhiteCastling: boolean = true,
    isLongWhiteCastling: boolean = true,
    isShortBlackCastling: boolean = true,
    isLongBlackCastling: boolean = true,
    pawnTresspassing: CellCoord | null = null,
    fiftyRuleCount: number = 0,
    moveNumber: number = 1
  ) {
    this.position = position;
    this.playerColor = playerColor;
    this.isShortWhiteCastling = isShortWhiteCastling;
    this.isLongWhiteCastling = isLongWhiteCastling;
    this.isShortBlackCastling = isShortBlackCastling;
    this.isLongBlackCastling = isLongBlackCastling;
    this.pawnTresspassing = pawnTresspassing;
    this.fiftyRuleCount = fiftyRuleCount;
    this.moveNumber = moveNumber;

    this.cost = this.calculateCost();
  }

  copy(): IField {
    return new Field(this.position.copy(), this.playerColor);
  }
  getAllCellCoords(): CellCoords {
    const result = new CellCoords();
    for (let i = 0; i < COMMON.BOARD_SIZE; i++) {
      for (let j = 0; j < COMMON.BOARD_SIZE; j++) {
        result.add(new CellCoord(i, j));
      }
    }
    return result;
  }
  getFigures(): Figures {
    return this.position.getAllFigures();
  }
  getPosition(): IPosition {
    return this.position.copy();
  }
  getFigure(coord: ICellCoord): IFigure | undefined {
    return this.position.getFigure(coord);
  }

  getAllowedMoves(coord: ICellCoord): Moves {
    let figure = this.getFigure(coord);
    if (figure === undefined) {
      return new Moves();
    } else {
      return figure.getMoves(coord, this);
      // TODO: отфильтровать по корректности здесь, либо в Figure.gerMoves() UPD: Проверять не надо, в генерации для фигуры будем генерировать только корректные
    }
  }
  isFreeCell(coord: ICellCoord): boolean {
    return !this.position.hasFigure(coord);
  }
  private calculateCost(): number {
    let result = 0;
    for (let figure of this.position.getAllFigures()) {
      const figureCost = COMMON.FIGURE_COST.get(figure.type);
      if (figureCost !== undefined) {
        result += figureCost * (figure.color == ChessColor.white ? 1 : -1);
      } else {
        throw new Error('Error in Field.calculateCost(): cannot find cost of figure');
      }
    }
    return result;
  }
  toFEN(): string {
    let result = new Array<string>();
    for (let y = 0; y < COMMON.BOARD_SIZE; y++) {
      let freeCount = 0;
      for (let x = 0; x < COMMON.BOARD_SIZE; x++) {
        let coord = new CellCoord(x, y);
        if (this.isFreeCell(coord)) {
          freeCount++;
        } else {
          if (freeCount > 0) {
            result.push(String(freeCount));
            freeCount = 0;
          }
          const figure = this.getFigure(coord);
          result.push(figure ? figure.toString() : '');
        }
      }
      if (freeCount > 0) {
        result.push(String(freeCount));
        freeCount = 0;
      }
      result.push(y == COMMON.BOARD_SIZE - 1 ? ' ' : '/');
    }
    result.push(this.playerColor == ChessColor.white ? 'w ' : 'b ');
    result.push(this.isShortWhiteCastling ? 'K' : '');
    result.push(this.isLongWhiteCastling ? 'Q' : '');
    result.push(this.isShortBlackCastling ? 'k' : '');
    result.push(this.isLongBlackCastling ? 'q' : '');
    if (!(this.isShortWhiteCastling || this.isLongWhiteCastling || this.isShortBlackCastling || this.isLongBlackCastling)) {
      result.push('-');
    }
    result.push(' ');
    result.push(this.pawnTresspassing === null ? '-' : this.pawnTresspassing.toString());
    result.push(' ');
    result.push(String(this.fiftyRuleCount));
    result.push(' ');
    result.push(String(this.moveNumber));
    return result.join('');
  }
  static fromFEN(fen: string): IField {
    const fenPartial = fen.split(' ');
    let x = 0;
    let y = 0;
    const position = new Position();
    let playerColor: ChessColor;
    let isShortWhiteCastling: boolean = false;
    let isLongWhiteCastling: boolean = false;
    let isShortBlackCastling: boolean = false;
    let isLongBlackCastling: boolean = false;
    let pawnTresspassing: CellCoord | null = null;
    let fiftyRuleCount: number = 0;
    let moveNumber: number = 1;
    for (let k = 0; k < fenPartial[0].length; k++) {
      const fenItem = fenPartial[0].charAt(k);
      if (fenItem == '/') {
        x = 0;
        y++;
      } else {
        if (fenItem >= '1' && fenItem <= '8') {
          x += Number(fenItem);
        } else {
          position.addFigure(new CellCoord(x, y), COMMON.FIGURE_FROM_CHAR.get(fenItem));
          x++;
        }
      }
    }
    playerColor = fenPartial[1] == 'w' ? ChessColor.white : ChessColor.black;
    if (fenPartial[2] != '-') {
      for (let k = 0; k < fenPartial[2].length; k++) {
        const castlingFlag = fenPartial[0].charAt(k);
        switch (castlingFlag) {
          case 'K':
            isShortWhiteCastling = true;
            break;
          case 'Q':
            isLongWhiteCastling = true;
            break;
          case 'k':
            isShortBlackCastling = true;
            break;
          case 'q':
            isLongBlackCastling = true;
            break;
        }
      }
    }
    if (fenPartial[3] != '-') {
      pawnTresspassing = CellCoord.fromString(fenPartial[3]);
    }
    fiftyRuleCount = Number(fenPartial[4]);
    moveNumber = Number(fenPartial[5]);
    return new Field(position, playerColor, isShortWhiteCastling, isLongWhiteCastling, isShortBlackCastling, isLongWhiteCastling, pawnTresspassing, fiftyRuleCount, moveNumber);
  }
  static getStartField(): IField {
    return Field.fromFEN(COMMON.START_POSITION_FEN);
  }

  // TODO: Implement next functions
  // getRecommendMoves(): Moves;
  // toString(): string;
  // isMate(): boolean
}
