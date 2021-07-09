import { CellCoord } from './cell-coord';
import { ChessColor } from './chess-color';
import { Field } from './field';
import { Pawn } from './figures/pawn';
import { ICellCoord } from './icell-coord';
import { IField } from './ifield';
import { IMove } from './imove';
import { IPosition } from './iposition';
import { IVector } from './ivector';

export class Move implements IMove {
  readonly startPosition: ICellCoord;
  readonly vector: IVector;
  constructor(startPosition: ICellCoord, vector: IVector) {
    this.startPosition = startPosition;
    this.vector = vector;
  }
  getResultPosition(): ICellCoord {
    return this.vector.resultPosition(this.startPosition);
  }
  getNotation(field: IField): string {
    // TODO: добавить проверку на взятие фигуры
    // TODO: добавить рокировку
    // TODO: добавить взятие пешки на проходе
    // TODO: добавить правило 50 ходов
    // TODO: добавить шах/мат

    if (this.isValid(field)) {
      return `${field.getFigure(this.startPosition)?.toString()}${this.startPosition.toString}—${this.vector.resultPosition(this.startPosition)}`;
    } else return 'Illegal Move';
  }
  isValid(field: IField): boolean {
    let result = false;
    if (!field.isFreeCell(this.startPosition)) {
      const fieldFigure = field.getFigure(this.startPosition);
      if (field.playerColor === fieldFigure?.color) {
        const fieldMoves = field.getAllowedMoves(this.startPosition);
        const legalDestinations = new Set<String>();
        for (let fieldMove of fieldMoves) {
          legalDestinations.add(fieldMove.getResultPosition().toString());
        }
        result = legalDestinations.has(this.getResultPosition().toString());
      }
    }
    return result;
  }
  makeMove(field: IField): IField {
    const resultPosition: IPosition = field.getPosition();
    const targetCell = this.getResultPosition();
    const figure = field.getFigure(this.startPosition);
    if (figure) {
      if (!field.isFreeCell(targetCell)) {
        resultPosition.deleteFigure(targetCell);
      }
      if (field.pawnTresspassing !== null && figure.toString().toLowerCase() == new Pawn(ChessColor.black).toString() && field.pawnTresspassing.equal(targetCell)) {
        resultPosition.deleteFigure(new CellCoord(targetCell.x, targetCell.y + (field.playerColor == ChessColor.white ? 1 : -1)));
      }
      resultPosition.addFigure(targetCell, figure);
      resultPosition.deleteFigure(this.startPosition);
      let pawnTresspassing: ICellCoord | null = null;
      if (figure.toString().toLowerCase() == new Pawn(ChessColor.black).toString() && Math.abs(this.vector.y) == 2) {
        pawnTresspassing = new CellCoord(this.startPosition.x, this.startPosition.y + Math.round(this.vector.y / 2));
      }
      return new Field( resultPosition,
                        field.playerColor == ChessColor.white ? ChessColor.black : ChessColor.white,
                        field.isShortWhiteCastling,
                        field.isLongWhiteCastling,
                        field.isShortBlackCastling,
                        field.isLongBlackCastling,
                        pawnTresspassing,
                        ( figure.toString().toLowerCase() == new Pawn(ChessColor.black).toString() ||
                          resultPosition.getFiguresCount() < field.getFiguresCount()) ? 0 : field.fiftyRuleCount + 1,
                        field.moveNumber + (field.playerColor == ChessColor.black ? 1 : 0));
    } else {
      throw new Error('Error in Move.makeMove: empty start position');
    }
  }
  toString(): string {
    return this.startPosition.toString() + '-' + this.vector.resultPosition(this.startPosition).toString();
  }
}
