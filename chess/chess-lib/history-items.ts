import { IField } from './ifield';
import { IHistoryItem } from './ihistory-item';
import { HistoryItem } from './history-item';
import { IMove } from './imove';

export class HistoryItems {
  private history: Array<IHistoryItem>;
  constructor() {
    this.history = [];
  }
  addItem(move: IMove, field: IField) {
    this.history.push(new HistoryItem(move, field));
  }
  getHistory(): Array<IHistoryItem> {
    return new Array<IHistoryItem>(...this.history);
  }
}
