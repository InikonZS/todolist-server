import { CellCoord } from './cell-coord';
import { ChessColor } from './chess-color';
import { Field } from './field';
import { IChessProcessor } from './ichess-processor';
import { IField } from './ifield';
import { Move } from './move';
import { Moves } from './moves';
import { Vector } from './vector';
import { HistoryItems } from './history-items';
import { IHistoryItem } from './ihistory-item';
import { King } from './figures/king';

export class ChessProcessor implements IChessProcessor {
  private field: IField;
  private players: Map<ChessColor, string>;
  private historyItems: HistoryItems;
  private gameMode: string;
  constructor() {
    this.field = Field.getStartField();
    this.players = new Map<ChessColor, string>();
    this.historyItems = new HistoryItems();
    this.gameMode = '';
  }
  setPlayer(player: string): boolean {
    if (!this.players.has(ChessColor.white)) {
      this.players.set(ChessColor.white, player);
      return true;
    }
    if (!this.players.has(ChessColor.black) && this.gameMode == 'network') {
      this.players.set(ChessColor.black, player);
      return true;
    }
    return false;
  }
  getPlayersNumber(): number {
    return this.players.size;
  }
  getPlayers(): Array<string> {
    const result = new Array<string>();
    if (this.players.has(ChessColor.white)) {
      result.push(this.players.get(ChessColor.white));
    }
    if (this.players.has(ChessColor.black)) {
      result.push(this.players.get(ChessColor.black));
    }
    return result;
  }
  setGameMode(mode: string) {
    this.gameMode = mode;
  }
  getGameMode(): string {
    return this.gameMode;
  }
  getCurrentPlayer(): string {
    const playerName = this.players.get(this.field.playerColor);
    return playerName ? playerName : (this.gameMode == 'oneScreen' ? this.players.get(ChessColor.white) : 'none');
  }
  clearData(): void {
    this.field = Field.getStartField();
    // this.players = new Map<ChessColor, string>();
  }
  getField(): string {
    return this.field.toFEN();
  }
  makeMove(start_coord: CellCoord, end_coord: CellCoord): boolean {
    const move = new Move(start_coord, new Vector(end_coord.x - start_coord.x, end_coord.y - start_coord.y));
    if (move.isValid(this.field)) {
      this.historyItems.addItem(move, this.field);
      this.field = move.makeMove(this.field);
      return true;
    } else {
      return false;
    }
  }
  getHistory(): Array<IHistoryItem> {
    return this.historyItems.getHistory();
  }
  getMoves(coord: CellCoord): Moves {
    return this.field.getAllowedMoves(coord);
  }
  getKingPos(): CellCoord {
    return this.field.getKingCoord();
  }
}
