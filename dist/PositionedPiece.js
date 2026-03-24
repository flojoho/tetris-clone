export default class PositionedPiece {
    constructor() {
        this.x = 4;
        this.y = 23;
        this.grid = [
            [true, false, false],
            [true, true, true],
            [false, false, false]
        ];
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}
