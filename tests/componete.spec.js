// FILEPATH: /Users/dpsnqmk/Documents/projetos-html-css-js/tetris-canvas/tests/Componente.spec.js

import { Componente } from "../src/Componente";

describe("Componente", () => {
  let componente;

  beforeEach(() => {
    componente = new Componente();
    // Mock the gameArea object
    componente.gameArea = {
      fillStyle: "",
      fillRect: jest.fn(),
    };
    // Mock the console object
    global.console = {
      clear: jest.fn(),
      table: jest.fn(),
    };

    // Initialize componente.current and componente.current.location
    componente.current = {
      location: [{}],
    };

     // Initialize componente.area
     componente.area = Array(20).fill().map(() => Array(10).fill(0));

  });

  describe("down", () => {
    test("should return isPlaying if isPlaying is false", () => {
      componente.isPlaying = false;
      expect(componente.down()).toBe(false);
    });

    test("should return true if stopDown is true", () => {
      componente.isPlaying = true;
      componente.stopDown = jest.fn().mockReturnValue(true);
      componente.clear = jest.fn();
      componente.current = {
        location: [{ x: 0, y: 0 }],
        color: "red",
        size: 1,
        type: "T",
        angle: "0",
        minX: 0,
        minY: 0,
      };
      componente.area = [[null]];
      expect(componente.down()).toBe(true);
      expect(componente.gameArea.fillRect).toHaveBeenCalledWith(0, 33, 30, 30);
      expect(componente.current.location[0]).toEqual({ x: 0, y: 33 });
    });

    test("should call invalid and checkScore if stopDown is false", () => {
      componente.isPlaying = true;
      componente.stopDown = jest.fn().mockReturnValue(false);
      componente.invalid = jest.fn();
      componente.checkScore = jest.fn();
      componente.addEmptyLines = jest.fn();
      componente.activateNextPiece = jest.fn();
      componente.printNewScreen = jest.fn();
      expect(componente.down()).toBe(false);
      expect(componente.invalid).toHaveBeenCalled();
      expect(componente.checkScore).toHaveBeenCalledWith(
        componente.addEmptyLines,
        componente.activateNextPiece,
        componente.printNewScreen
      );
    });
  });
});
