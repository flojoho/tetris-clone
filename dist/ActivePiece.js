import MainGrid from "./MainGrid.js";
import PositionedPiece from "./PositionedPiece.js";
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
];
class ActivePiece extends PositionedPiece {
    constructor() {
        if (ActivePiece.buffer.length === 0)
            ActivePiece.buffer = [...tetrominoes];
        const randomIndex = Math.floor(Math.random() * ActivePiece.buffer.length);
        super(4, 22, ActivePiece.buffer[randomIndex]);
        ActivePiece.buffer.splice(randomIndex, 1);
    }
    rotateLeft() {
        const newGrid = [];
        const rows = this.grid[0].length;
        for (let i = rows - 1; i >= 0; i--) {
            const row = [];
            for (let j = 0; j < rows; j++) {
                row.push(this.grid[j][i]);
            }
            newGrid.push(row);
        }
        if (MainGrid.currentInstance.checkCollision(new PositionedPiece(this.x, this.y, newGrid), 0, 0))
            return; // temporary rotation collision fix
        this.grid = newGrid;
    }
    rotateRight() {
        const newGrid = [];
        const rows = this.grid[0].length;
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = rows - 1; j >= 0; j--) {
                row.push(this.grid[j][i]);
            }
            newGrid.push(row);
        }
        if (MainGrid.currentInstance.checkCollision(new PositionedPiece(this.x, this.y, newGrid), 0, 0))
            return; // temporary rotation collision fix
        this.grid = newGrid;
    }
}
ActivePiece.buffer = [...tetrominoes];
export default ActivePiece;
