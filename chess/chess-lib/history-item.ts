import { ICellCoord } from './icell-coord';
import { IField } from './ifield';
import { IHistoryItem } from './ihistory-item';
import { IMove } from './imove';

export class HistoryItem implements IHistoryItem {
  readonly figure: string;
  readonly startCell: ICellCoord;
  readonly endCell: ICellCoord;
  readonly time: Date;
  constructor(move: IMove, field: IField) {
    this.figure = field.getFigure(move.startCell).toString();
    this.startCell = move.startCell;
    this.endCell = move.getTargetCell();
    this.time = new Date();
  }
}
