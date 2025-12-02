import { Tetraminos } from './Tetraminos';
import { Componente } from './Componente';
import { printScreenGame, random, printScore, printScreenNextPart, tetraminos, printLevel } from './utils';
import { Rotate } from './rotacao';
import { KeyBoard } from './keyBoard';

/**
 * GameController - Handles game initialization and control
 */
export class GameController {
  constructor(canvasId) {
    this.gameArea = document.getElementById(canvasId);
    this.canvasGameArea = this.gameArea.getContext('2d');
    this.canvasGameArea.lineWidth = 0.1;
    
    this.keyboard = null;
    this.componete = null;
    this.nextPiece = null;
    this.matriz = null;
    
    this.initializeGame();
  }

  initializeGame() {
    // Initialize keyboard
    this.keyboard = new KeyBoard(this.canvasGameArea);
    
    // Initialize game matrix
    this.matriz = printScreenGame(this.canvasGameArea);

    // Create first tetramino
    const _TETRAMINO = random(tetraminos);
    const tetramino = Tetraminos[_TETRAMINO];

    // Rotate and position the tetramino
    const rotate = new Rotate(tetramino);
    const { angle, current, minY, minX } = rotate.execute();

    const locationTemp = current.map((location) => {
      const { x, y } = location;
      this.canvasGameArea.fillStyle = tetramino.color;
      this.canvasGameArea.fillRect(x, y, 30, 30);
      this.matriz[(y / 33)][(x / 33)] = 'c';
      return { x, y };
    });

    printLevel(this.canvasGameArea, 1);

    // Create next piece
    this.nextPiece = Tetraminos[random(tetraminos)];

    // Create component
    this.componete = new Componente({
      location: locationTemp,
      color: tetramino.color,
      size: tetramino.size,
      type: tetramino.type,
      angle: angle,
      minX,
      minY
    }, this.canvasGameArea, this.matriz, this.nextPiece);

    printScore(this.canvasGameArea);
    printScreenNextPart(this.canvasGameArea);
    this.componete.printNextPart();
  }

  setUpdateFunction(updateFn) {
    this.componete.update = updateFn;
    this.nextPiece.update = updateFn;
  }

  stop() {
    if (this.componete.isPlaying && !this.componete.endGame) {
      this.componete.stop(false);
      this.componete.isPlaying = false;
    }
  }

  start() {
    if (!this.componete.isPlaying && !this.componete.endGame) {
      this.componete.timer();
      this.componete.start();
    }
  }

  getKeyboard() {
    return this.keyboard;
  }

  getComponete() {
    return this.componete;
  }

  getNextPiece() {
    return this.nextPiece;
  }
}
