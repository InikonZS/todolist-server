import { CellCoord } from '../cell-coord';
import { ChessColor } from '../chess-color';
import { COMMON } from '../common';
import { Figure } from '../figure';
import { FigureType } from '../figure-type';
import { IField } from '../ifield';
import { Move } from '../move';
import { Moves } from '../moves';

export class King extends Figure {
  constructor(color: ChessColor) {
    super(FigureType.king, color);
  }
  getMoves(position: CellCoord, field: IField): Moves {
    const result = new Moves();
    for (let vector of COMMON.DIAGONAL_MOVES) {
      let resultPosition = vector.resultPosition(position);
      if (resultPosition.isCorrect() && (field.isFreeCell(resultPosition) || field.getFigure(resultPosition)?.color !== this.color)) {
        result.add(new Move(position, vector));
      }
    }
    for (let vector of COMMON.HV_MOVES) {
      let resultPosition = vector.resultPosition(position);
      if (resultPosition.isCorrect() && (field.isFreeCell(resultPosition) || field.getFigure(resultPosition)?.color !== this.color)) {
        result.add(new Move(position, vector));
      }
    }
    return result;
  }
}