import { CellCoord } from '../cell-coord';
import { ChessColor } from '../chess-color';
import { COMMON } from '../common';
import { Figure } from '../figure';
import { FigureType } from '../figure-type';
import { IField } from '../ifield';
import { Move } from '../move';
import { Moves } from '../moves';


export class Pawn extends Figure {
  constructor(color: ChessColor) {
    super(FigureType.pawn, color);
  }
  getMoves(position: CellCoord, field: IField): Moves {
    const result = new Moves();
    const hMoves = field.playerColor == ChessColor.white ? COMMON.UP_MOVES : COMMON.DOWN_MOVES;
    const dMoves = field.playerColor == ChessColor.white ? COMMON.UP_DIAG_MOVES : COMMON.DOWN_DIAG_MOVES;
    const tresspassingStartRow = field.playerColor == ChessColor.white ? COMMON.BOARD_SIZE - 2 : 1;
    if (!field.isFreeCell(position) && field.getFigure(position).toString() == this.toString() && field.playerColor == this.color) {
      for (let vector of hMoves) {
        let resultPosition = vector.resultPosition(position);
        if (resultPosition.isCorrect() && field.isFreeCell(resultPosition)) {
          result.add(new Move(position, vector));
        }
      }
      for (let vector of dMoves) {
        let resultPosition = vector.resultPosition(position);
        if (  resultPosition.isCorrect() && 
              ((!field.isFreeCell(resultPosition) && field.getFigure(resultPosition)?.color !== this.color) ||
               (field.pawnTresspassing !== null && resultPosition.equal(field.pawnTresspassing)))
           ) {
          result.add(new Move(position, vector));
        }
      }
      if (position.y == tresspassingStartRow) {
        for (let vector of hMoves) {
          if (field.isFreeCell(vector.resultPosition(position))) {
            vector = vector.sum(vector);
            let resultPosition = vector.resultPosition(position);
            if (resultPosition.isCorrect() && field.isFreeCell(resultPosition)) {
              result.add(new Move(position, vector));
            }
          }
        }
      }
    }
    return result;
  }
}