import ActivePiece from "./ActivePiece.js";
import MainGrid from "./MainGrid.js";
const primaryTimeout = 133;
const secondaryTimeout = 20;
class Game {
    constructor() {
        this.lastStepTime = Date.now();
        this.mainGrid = new MainGrid(10, 20);
        this.activePiece = new ActivePiece();
        for (const event of Game.eventListeners) {
            removeEventListener(event.type, event.listener);
        }
        const keyEvents = {};
        const addKeyDownEvent = (keyCode, action) => {
            if (keyEvents[keyCode])
                return;
            action();
            const repeatAction = () => {
                action();
                keyEvents[keyCode] = setTimeout(repeatAction, secondaryTimeout);
            };
            keyEvents[keyCode] = setTimeout(repeatAction, primaryTimeout);
        };
        const removeKeyDownEvent = (keyCode) => {
            const timeoutId = keyEvents[keyCode];
            if (timeoutId) {
                clearInterval(timeoutId);
                keyEvents[keyCode] = undefined;
            }
        };
        const keydownListener = (e) => {
            const keyCode = e.code;
            if (keyCode === 'ArrowLeft') {
                addKeyDownEvent('ArrowLeft', () => {
                    if (!this.mainGrid.checkCollision(this.activePiece, -1, 0))
                        this.activePiece.move(-1, 0);
                });
            }
            else if (keyCode === 'ArrowRight') {
                addKeyDownEvent('ArrowRight', () => {
                    if (!this.mainGrid.checkCollision(this.activePiece, 1, 0))
                        this.activePiece.move(1, 0);
                });
            }
            else if (keyCode === 'ArrowDown') {
                addKeyDownEvent('ArrowDown', () => {
                    if (!this.mainGrid.checkCollision(this.activePiece, 0, -1))
                        this.activePiece.move(0, -1);
                });
            }
            else if (keyCode === 'ArrowUp') {
                this.activePiece.rotateRight();
            }
            else if (keyCode === 'Space') {
                while (!this.mainGrid.checkCollision(this.activePiece, 0, -1)) {
                    this.activePiece.move(0, -1);
                }
                this.mainGrid.solidifyPiece(this.activePiece);
                this.activePiece = new ActivePiece();
            }
        };
        addEventListener('keydown', keydownListener);
        Game.eventListeners.push({ type: 'keydown', listener: keydownListener });
        const keyupListener = (e) => {
            const keyCode = e.code;
            if (keyCode === 'ArrowLeft') {
                removeKeyDownEvent('ArrowLeft');
            }
            else if (keyCode === 'ArrowRight') {
                removeKeyDownEvent('ArrowRight');
            }
            else if (keyCode === 'ArrowDown') {
                removeKeyDownEvent('ArrowDown');
            }
        };
        addEventListener('keyup', keyupListener);
        Game.eventListeners.push({ type: 'keyup', listener: keyupListener });
    }
}
Game.eventListeners = [];
export default Game;
