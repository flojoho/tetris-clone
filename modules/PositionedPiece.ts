import { Tetromino } from "./ActivePiece.js"; 

class PositionedPiece {
  x: number;
  y: number;
  grid: Tetromino;

  constructor(x: number, y: number, grid: Tetromino) {
    this.x = x;
    this.y = y;
    this.grid = grid;
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}

export default PositionedPiece;
