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
class PositionedPiece {
    constructor() {
        this.x = 4;
        this.y = 22;
        if (PositionedPiece.buffer.length === 0)
            PositionedPiece.buffer = [...tetrominoes];
        const randomIndex = Math.floor(Math.random() * PositionedPiece.buffer.length);
        this.grid = PositionedPiece.buffer[randomIndex];
        PositionedPiece.buffer.splice(randomIndex, 1);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
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
        this.grid = newGrid;
    }
}
PositionedPiece.buffer = [...tetrominoes];
export default PositionedPiece;
