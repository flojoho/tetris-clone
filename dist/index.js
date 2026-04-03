import ActivePiece from './ActivePiece.js';
import PositionedPiece from './PositionedPiece.js';
import Square from './Square.js';
import Game from './Game.js';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fps = 50;
const tickDuration = 800;
let game = new Game();
setInterval(() => {
    let { activePiece, mainGrid } = game;
    if (Date.now() - game.lastStepTime > tickDuration) {
        if (mainGrid.checkCollision(activePiece, 0, -1)) {
            mainGrid.solidifyPiece(activePiece);
            game.activePiece = new ActivePiece();
        }
        else {
            activePiece.move(0, -1);
        }
        game.lastStepTime = game.lastStepTime + tickDuration;
    }
    for (let i = 0; i < mainGrid.height; i++) {
        const row = mainGrid.array[i];
        if (row.every(entry => typeof entry === 'object')) {
            mainGrid.array.splice(i, 1);
            mainGrid.array.push(Array.from({ length: mainGrid.width }, () => false));
        }
    }
    if (mainGrid.array[mainGrid.height].some(entry => entry !== false)) {
        game = new Game();
    }
    const previewPiece = new PositionedPiece(activePiece.x, activePiece.y, activePiece.grid);
    while (!mainGrid.checkCollision(previewPiece, 0, -1)) {
        previewPiece.move(0, -1);
    }
    // rendering
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const originX = centerX - mainGrid.width / 2 * Square.width;
    const originY = centerY + mainGrid.height / 2 * Square.width;
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    ctx.strokeRect(originX, centerY - mainGrid.height / 2 * Square.width, mainGrid.width * Square.width, mainGrid.height * Square.width);
    for (let i = 1; i < mainGrid.width; i++) {
        for (let j = 1; j < mainGrid.height; j++) {
            ctx.fillStyle = 'gray';
            ctx.beginPath();
            ctx.arc(originX + i * Square.width, originY - j * Square.width, 1, 0, 2 * Math.PI);
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
                squares.push({ x: activePiece.x + j, y: activePiece.y - i, color: 'white' }, { x: previewPiece.x + j, y: previewPiece.y - i, color: 'whiteTransparent' });
            }
        }
    }
    for (let i = 0; i < mainGrid.array.length; i++) {
        const row = mainGrid.array[i];
        for (let j = 0; j < row.length; j++) {
            const entry = row[j];
            if (entry) {
                squares.push({ x: j, y: i, color: 'white' });
            }
        }
    }
    for (const square of squares) {
        if (square.color === 'white')
            ctx.fillStyle = 'white';
        if (square.color === 'whiteTransparent')
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.rect(originX + square.x * Square.width, originY - square.y * Square.width - Square.width, Square.width, Square.width);
        ctx.fill();
    }
}, 1000 / fps);
