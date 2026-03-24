type Tetromino = boolean[][];

const tetrominoes = [
  [
    [true, false, false],
    [true, true, true],
    [false, false, false]
  ]
]

export default class PositionedPiece {
  public x: number;
  public y: number;
  public grid: Tetromino;

  constructor() {
    this.x = 4;
    this.y = 23;
    
    const randomIndex = Math.floor(Math.random() * tetrominoes.length)

    this.grid = tetrominoes[randomIndex];
  }

  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  rotateLeft() {
    const newGrid: Tetromino = [];
    const rows = this.grid[0].length;
    for(let i = rows - 1; i >= 0; i--) {
      const row: boolean[] = [];
      for(let j = 0; j < rows; j++) {
        row.push(this.grid[j][i]);
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }

  rotateRight() {
    const newGrid: Tetromino = [];
    const rows = this.grid[0].length;
    for(let i = 0; i < rows; i++) {
      const row: boolean[] = [];
      for(let j = rows - 1; j >= 0; j--) {
        row.push(this.grid[j][i]);
      }
      newGrid.push(row);
    }
    this.grid = newGrid;
  }
}
