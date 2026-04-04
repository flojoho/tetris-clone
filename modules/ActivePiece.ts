import MainGrid from "./MainGrid.js";
import PositionedPiece, { Tetromino } from "./PositionedPiece.js";

const tetrominoes = [
  [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false]
  ],
  [
    [true, false, false],
    [true, true, true],
    [false, false, false]
  ],
  [
    [false, false, true],
    [true, true, true],
    [false, false, false]
  ],
  [
    [false, false, false, false],
    [false, true, true, false],
    [false, true, true, false],
    [false, false, false, false]
  ],
  [
    [false, true, true],
    [true, true, false],
    [false, false, false]
  ],
  [
    [false, true, false],
    [true, true, true],
    [false, false, false]
  ],
  [
    [true, true, false],
    [false, true, true],
    [false, false, false]
  ]
]

export default class ActivePiece extends PositionedPiece {
  private static buffer: Tetromino[] = [...tetrominoes];

  constructor() {
    if(ActivePiece.buffer.length === 0) ActivePiece.buffer = [...tetrominoes];
    const randomIndex = Math.floor(Math.random() * ActivePiece.buffer.length);

    super(4, 23, ActivePiece.buffer[randomIndex]);

    ActivePiece.buffer.splice(randomIndex, 1);
  }

  public rotateLeft() {
    const newGrid: Tetromino = [];
    const rows = this.grid[0].length;
    for(let i = rows - 1; i >= 0; i--) {
      const row: boolean[] = [];
      for(let j = 0; j < rows; j++) {
        row.push(this.grid[j][i]);
      }
      newGrid.push(row);
    }

    if(MainGrid.currentInstance.checkCollision(new PositionedPiece(this.x, this.y, newGrid), 0, 0)) return; // temporary rotation collision fix

    this.grid = newGrid;
  }

  public rotateRight() {
    const newGrid: Tetromino = [];
    const rows = this.grid[0].length;
    for(let i = 0; i < rows; i++) {
      const row: boolean[] = [];
      for(let j = rows - 1; j >= 0; j--) {
        row.push(this.grid[j][i]);
      }
      newGrid.push(row);
    }
    if(MainGrid.currentInstance.checkCollision(new PositionedPiece(this.x, this.y, newGrid), 0, 0)) return; // temporary rotation collision fix
    this.grid = newGrid;
  }
}
