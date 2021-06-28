// export interface IChessGame {
//   setPlayers(player: string): boolean; //установка имени игрока
//   getCurrentPlayer(): string; //возвращает имя игрока, у которого сейчас ход
//   setCurrentPlayer(); // !!! не понял, что делает. Передаёт ход? Так это должно делаться чем-то вроде makeMove()
//   changePlayer(player: string, coords: CellCoord); // !!! По реализации - вроде то же, что и setCurrentPlayer(), но при чём тут координаты?
//   getAllowedMoves(): IMoves; // я так понимаю - возвращает все ходы всех фигур для текущего игрока?
//   clearData(): void; // возвращает доску к дефолтной, очищает игроков. Нужен ли этот метод? Вместо него можно просто новый объект игры создать.
//   getField(): string; // возвращает FEN текущего состояния
//   constructor(): IChessGame; // создаёт доску со стартовым полем, имена игроков не определены.

//   // что, считаю, надо добавить
//   makeMove(start_coord: CellCoord, end_coord: CellCoord): boolean; // сделать ход - меняется состояние поля, текущий игрок
//   getMoves(coord: CellCoord): IMoves; // доступные ходы для конкретной фигуры
// }
//Точки входа socketService.js
// chessStartGame() -> рассылка всем field: newFen;
// joinPlayer() -> присоединение игрока
// chessFigureGrab(coord) -> рассылка всем moves: IMoves (или ходы в другом формате)
// chessMove(start_coord, end_coord) -> рассылка всем messageText: (start_coord, end_coord), field: newFen
// chessStopGame() -> очистка игры, рассылка всем stop: true;
// chessRemoveGame() -> то же, что и chessStopGame(), но с выдачей fen

import { CellCoord } from './cell-coord';
import { Moves } from './moves';

export interface IChessProcessor {
  setPlayer(player: string): boolean;
  getCurrentPlayer(): string;
  clearData(): void;
  getField(): string;
  makeMove(start_coord: CellCoord, end_coord: CellCoord): boolean;
  getMoves(coord: CellCoord): Moves;
}
