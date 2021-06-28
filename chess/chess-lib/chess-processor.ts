import { CellCoord } from './cell-coord';
import { ChessColor } from './chess-color';
import { Field } from './field';
import { IChessProcessor } from './ichess-processor';
import { IField } from './ifield';
import { Move } from './move';
import { Moves } from './moves';
import { Vector } from './vector';

export class ChessProcessor implements IChessProcessor {
  private field: IField;
  private players: Map<ChessColor, string>;
  constructor() {
    this.field = Field.getStartField();
    this.players = new Map<ChessColor, string>();
  }
  setPlayer(player: string): boolean {
    if (!this.players.has(ChessColor.white)) {
      this.players.set(ChessColor.white, player);
      return true;
    }
    if (!this.players.has(ChessColor.black)) {
      this.players.set(ChessColor.black, player);
      return true;
    }
    return false;
  }
  getCurrentPlayer(): string {
    const playerName = this.players.get(this.field.playerColor);
    return playerName ? playerName : 'none';
  }
  clearData(): void {
    this.field = Field.getStartField();
    this.players = new Map<ChessColor, string>();
  }
  getField(): string {
    return this.field.toFEN();
  }
  makeMove(start_coord: CellCoord, end_coord: CellCoord): boolean {
    const move = new Move(start_coord, new Vector(end_coord.x - start_coord.x, end_coord.y - start_coord.y));
    if (move.isValid(this.field)) {
      this.field = move.makeMove(this.field);
      return true;
    } else {
      return false;
    }
  }
  getMoves(coord: CellCoord): Moves {
    return this.field.getAllowedMoves(coord);
  }
}
