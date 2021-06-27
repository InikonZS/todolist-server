import { FigureType } from './figure-type';
import { Vector } from './vector';
import { IFigure } from './ifigure';
import { ChessColor } from './chess-color';
import { Queen } from './figures/queen';
import { Rook } from './figures/rook';
import { Bishop } from './figures/bishop';
import { Knight } from './figures/knight';

export enum LOCALES {
  RU,
  EN,
}

export class COMMON {
  static NOVEMDECIMAL_BASE = 19;
  static BOARD_SIZE = 8;
  static DEFAULT_LOCALE = LOCALES.EN;
  // TODO: после реализации всех фигур - вернуть нормальную стартовую строку
  static START_POSITION_FEN = 'rnbq1bnr/8/8/8/8/8/8/RNBQ1BNR w KQkq - 0 1';
  // static START_POSITION_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  static FIGURE_SHORT_NAMES = new Map([
    // TODO: переписать красиво, чтобы удобно было обращаться к элементам
    [
      LOCALES.EN,
      new Map([
        [FigureType.king, 'K'],
        [FigureType.queen, 'Q'],
        [FigureType.rook, 'R'],
        [FigureType.bishop, 'B'],
        [FigureType.knight, 'N'],
        [FigureType.pawn, 'P'],
      ]),
    ],
    [
      LOCALES.RU,
      new Map([
        [FigureType.king, 'Кр'],
        [FigureType.queen, 'Ф'],
        [FigureType.rook, 'Л'],
        [FigureType.bishop, 'С'],
        [FigureType.knight, 'К'],
        [FigureType.pawn, 'П'],
      ]),
    ],
  ]);
  static FIGURE_FROM_CHAR = new Map<string, IFigure>([
    // TODO: расскоментить после реализации фигур
    // ['k', new King(ChessColor.black)],
    // ['K', new King(ChessColor.white)],
    // ['p', new Pawn(ChessColor.black)],
    // ['P', new Pawn(ChessColor.white)],
    ['q', new Queen(ChessColor.black)],
    ['Q', new Queen(ChessColor.white)],
    ['r', new Rook(ChessColor.black)],
    ['R', new Rook(ChessColor.white)],
    ['b', new Bishop(ChessColor.black)],
    ['B', new Bishop(ChessColor.white)],
    ['n', new Knight(ChessColor.black)],
    ['N', new Knight(ChessColor.white)],
  ]);
  static FIGURE_COST = new Map([
    [FigureType.king, 900],
    [FigureType.queen, 90],
    [FigureType.rook, 50],
    [FigureType.bishop, 30],
    [FigureType.knight, 30],
    [FigureType.pawn, 10],
  ]);
  static DIAGONAL_MOVES = [new Vector(-1, -1), new Vector(-1, 1), new Vector(1, -1), new Vector(1, 1)];
  static HV_MOVES = [new Vector(-1, 0), new Vector(1, 0), new Vector(0, -1), new Vector(0, 1)];
  static UP_MOVES = [new Vector(0, -1)];
  static DOWN_MOVES = [new Vector(0, 1)];
  static KNIGHT_MOVES = [new Vector(-2, -1), new Vector(-1, -2), new Vector(1, -2), new Vector(2, -1), new Vector(2, 1), new Vector(1, 2), new Vector(-1, 2), new Vector(-2, 1)];

  constructor() {}
}
