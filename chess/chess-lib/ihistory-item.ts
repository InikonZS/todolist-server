import { ICellCoord } from './icell-coord';

export interface IHistoryItem {
  readonly figure: string;
  readonly startCell: ICellCoord;
  readonly endCell: ICellCoord;
  readonly time: Date;
}
