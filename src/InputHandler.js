/**
 * InputHandler - Handles keyboard input for the game
 */
export class InputHandler {
  constructor(keyboard, gameController) {
    this.keyboard = keyboard;
    this.gameController = gameController;
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    document.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  handleKeyDown(event) {
    const keyCode = event.keyCode;
    const { componete } = this.gameController;

    if (keyCode === 13) {
      this.keyboard.printKeyBoards('enter', 'keydown');
      this.gameController.start();
    }

    if (componete.isPlaying && !componete.endGame) {
      event.preventDefault();

      if (keyCode === 80) {
        this.keyboard.printKeyBoards('p', 'keydown');
        this.gameController.stop();
      }

      if (keyCode === 38 || keyCode === 87) {
        this.keyboard.printKeyBoards('w', 'keydown');
        componete.rotation();
      }

      if (keyCode === 37 || keyCode === 65) {
        this.keyboard.printKeyBoards('a', 'keydown');
        componete.left();
      }

      if (keyCode === 39 || keyCode === 68) {
        this.keyboard.printKeyBoards('d', 'keydown');
        componete.right();
      }

      if (keyCode === 40 || keyCode === 83) {
        this.keyboard.printKeyBoards('s', 'keydown');
        componete.down();
      }

      if (keyCode === 32) {
        this.keyboard.printKeyBoards('space', 'keydown');
      }
    }
  }

  handleKeyUp(event) {
    const { componete } = this.gameController;

    if (componete.isPlaying && !componete.endGame) {
      const keyCode = event.keyCode;
      event.preventDefault();

      if (keyCode === 13) {
        this.keyboard.printKeyBoards('enter');
        this.keyboard.printKeyBoards('p');
      }

      if (keyCode === 38 || keyCode === 87) {
        this.keyboard.printKeyBoards('w');
      }

      if (keyCode === 39 || keyCode === 68) {
        this.keyboard.printKeyBoards('d');
      }

      if (keyCode === 37 || keyCode === 65) {
        this.keyboard.printKeyBoards('a');
      }

      if (keyCode === 32) {
        this.keyboard.printKeyBoards('space');
        componete.downAll();
      }

      if (keyCode === 40 || keyCode === 83) {
        this.keyboard.printKeyBoards('s');
      }
    }
  }
}
