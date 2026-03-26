export default class MainGrid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = Array.from({ length: height + 5 }, () => Array.from({ length: width }, () => false));
    }
    checkCollision(piece, dx, dy) {
        const pieceGrid = piece.grid;
        for (let i = 0; i < pieceGrid.length; i++) {
            const row = pieceGrid[i];
            for (let j = 0; j < row.length; j++) {
                const entry = row[j];
                if (entry) {
                    const x = piece.x + j + dx;
                    const y = piece.y - i + dy;
                    if (x < 0 || x >= this.width)
                        return true;
                    const mainGridRow = this.array[y];
                    if (!mainGridRow)
                        return true;
                    if (typeof this.array[y][x] === 'object')
                        return true;
                }
            }
        }
        return false;
    }
}
