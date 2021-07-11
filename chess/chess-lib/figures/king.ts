import { CellCoord } from '../cell-coord';
import { ChessColor } from '../chess-color';
import { COMMON } from '../common';
import { Figure } from '../figure';
import { FigureType } from '../figure-type';
import { IField } from '../ifield';
import { IMove } from '../imove';
import { Move } from '../move';
import { Moves } from '../moves';

export class King extends Figure {
  constructor(color: ChessColor) {
    super(FigureType.king, color);
  }
  getMoves(position: CellCoord, field: IField, checkKingDanger: boolean = true): Moves {
    const result = new Moves();
    if (!field.isFreeCell(position) && field.getFigure(position).toString() == this.toString() && field.playerColor == this.color) { 
      function isDangerousMove (move: IMove): boolean {
        const newField = move.makeMove(field);
        const attackedCells = newField.getAttackedCells();
        return attackedCells.has(move.getTargetCell().toString());
      }
      for (let vector of COMMON.DIAGONAL_MOVES) {
        let resultPosition = vector.resultPosition(position);
        if (resultPosition.isCorrect() && (field.isFreeCell(resultPosition) || field.getFigure(resultPosition)?.color !== this.color)) {
          const move = new Move(position, vector);
          if (!checkKingDanger || !isDangerousMove(move)) result.add(move);
        }
      }
      for (let vector of COMMON.HV_MOVES) {
        let resultPosition = vector.resultPosition(position);
        if (resultPosition.isCorrect() && (field.isFreeCell(resultPosition) || field.getFigure(resultPosition)?.color !== this.color)) {
          const move = new Move(position, vector);
          if (!checkKingDanger || !isDangerousMove(move)) result.add(move);
        }
      }
    }
    return result;
  }
}