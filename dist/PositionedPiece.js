class PositionedPiece {
    constructor(x, y, grid) {
        this.x = x;
        this.y = y;
        this.grid = grid;
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
export default PositionedPiece;
