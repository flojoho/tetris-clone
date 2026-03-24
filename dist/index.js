import PositionedPiece from './PositionedPiece.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = 50;
const tickDuration = 200;
let lastStepTime = Date.now();
let activePiece = new PositionedPiece();
const checkCollision = (dx, dy) => {
    const pieceGrid = activePiece.grid;
    for (let i = 0; i < pieceGrid.length; i++) {
        const row = pieceGrid[i];
        for (let j = 0; j < row.length; j++) {
            const entry = row[j];
            if (entry) {
                const x = activePiece.x + j + dx;
                const y = activePiece.y - i + dy;
                if (y < 0)
                    return true;
                if (x < 0 || x >= gridWidth)
                    return true;
            }
        }
    }
    return false;
};
const gridWidth = 10;
const gridHeight = 20;
const grid = {
    width: gridWidth,
    height: gridHeight,
    array: Array.from({ length: gridWidth }, () => Array.from({ length: gridHeight }, () => false))
};
const squareWidth = 30;
setInterval(() => {
    if (Date.now() - lastStepTime > tickDuration) {
        if (checkCollision(0, -1)) {
            const pieceGrid = activePiece.grid;
            for (let i = 0; i < pieceGrid.length; i++) {
                const row = pieceGrid[i];
                for (let j = 0; j < row.length; j++) {
                    const entry = row[j];
                    if (entry) {
                        const x = activePiece.x + j;
                        const y = activePiece.y - i;
                        grid.array[y][x] = { x, y, color: 'white' };
                    }
                }
            }
            activePiece = new PositionedPiece();
        }
        else {
            activePiece.move(0, -1);
        }
        lastStepTime = lastStepTime + tickDuration;
    }
    // rendering
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const originX = centerX - grid.width / 2 * squareWidth;
    const originY = centerY + grid.height / 2 * squareWidth;
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.strokeRect(originX, centerY - grid.height / 2 * squareWidth, grid.width * squareWidth, grid.height * squareWidth);
    for (let i = 1; i < grid.width; i++) {
        for (let j = 1; j < grid.height; j++) {
            ctx.fillStyle = 'gray';
            ctx.beginPath();
            ctx.arc(originX + i * squareWidth, originY - j * squareWidth, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    let squares = [];
    const pieceGrid = activePiece.grid;
    for (let i = 0; i < pieceGrid.length; i++) {
        const row = pieceGrid[i];
        for (let j = 0; j < row.length; j++) {
            const entry = row[j];
            if (entry) {
                squares.push({ x: activePiece.x + j, y: activePiece.y - i, color: 'white' });
            }
        }
    }
    for (let i = 0; i < grid.array.length; i++) {
        const row = grid.array[i];
        for (let j = 0; j < row.length; j++) {
            const entry = row[j];
            if (entry) {
                squares.push({ x: j, y: i, color: 'white' });
            }
        }
    }
    for (const square of squares) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.rect(originX + square.x * squareWidth, originY - square.y * squareWidth - squareWidth, squareWidth, squareWidth);
        ctx.fill();
    }
}, 1000 / fps);
addEventListener('keydown', e => {
    const keyCode = e.code;
    if (keyCode === 'ArrowLeft') {
        if (!checkCollision(-1, 0))
            activePiece.move(-1, 0);
    }
    else if (keyCode === 'ArrowRight') {
        if (!checkCollision(1, 0))
            activePiece.move(1, 0);
    }
});
