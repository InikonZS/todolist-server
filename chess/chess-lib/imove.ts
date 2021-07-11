import { ICellCoord } from './icell-coord';
import { IField } from './ifield';
import { IVector } from './ivector';

export interface IMove {
  readonly startCell: ICellCoord;
  readonly vector: IVector;

  getTargetCell(): ICellCoord;
  toString(): string;
  isValid(field: IField): boolean;
  makeMove(field: IField): IField;
}
