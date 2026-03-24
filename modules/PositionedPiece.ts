type Tetromino = boolean[][];

export default class PositionedPiece {
  public x: number;
  public y: number;
  public grid: Tetromino;

  constructor() {
    this.x = 4;
    this.y = 23;
    
    this.grid = [
      [true, false, false],
      [true, true, true],
      [false, false, false]
    ]
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }
}
