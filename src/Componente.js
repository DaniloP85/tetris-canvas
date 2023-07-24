import { Tetraminos } from "./Tetraminos";
import { Rotate } from "./rotacao";
import { random, cleanScreenNextPart, printScore, tetraminos, printTime, printLevel, formatador } from "./utils";

const colors = ["pink", "aqua", "orange", "blue", "yellow", "red", "green"];
const points = [100, 300, 500, 900]
let speed = 1000;

export class Componente {

  constructor(current, gameArea, area, nextPiece) {
    this.current = current;
    this.gameArea = gameArea;
    this.area = area;
    this.nextPiece = nextPiece;
    this.score = 0;
    this.level = 1;
    this.job = undefined;
    this.jobTimer = undefined;
    this.minute = undefined;
    this.isPlaying = false;
    this.endGame = false;
  }

  printNewScreen = (activateNextPiece) => {

    for (let i = 0; i < this.area.length; i++) {
      const linha = i * 33;
      let colunas = this.area[i];
      for (let j = 0; j < colunas.length; j++) {
        const coluna = j * 33;
        this.gameArea.fillStyle = this.area[i][j] ? this.area[i][j] : "#FFF";
        this.gameArea.fillRect(coluna, linha, 30, 30);
      }
    }

    activateNextPiece();
  }

  addEmptyLines = (fullLines, activateNextPiece, printNewScreen) => {

    fullLines.forEach(() => {
      this.area.unshift(new Array(9).fill(0));
    });

    printNewScreen(activateNextPiece);

  }

  checkScore = (addEmptyLines, activateNextPiece, printNewScreen) => {
    const fullLines = [];
    this.area.forEach((currentValue, index) => {
      const rows = currentValue.filter((row) => {
        if (row) {
          return row;
        }

      });

      if (currentValue.length === rows.length) {
        fullLines.push(index);
      }
    });

    if (fullLines.length === 0) {
      activateNextPiece();
      return false;
    }

    this.score = (this.score + (points[fullLines.length - 1] * this.level));
        
    if (this.score > this.maxScore){
      this.update(this.uid, this.score);
    }

    printScore(this.gameArea, formatador.format(this.score));

    const newArea = this.area.filter((_, i) => {
      return fullLines.indexOf(i) === -1;
    });

    this.area = newArea;
    addEmptyLines(fullLines, activateNextPiece, printNewScreen);
  }

  rotation = () => {

    if (!this.isPlaying) {
      return this.isPlaying
    }

    const rotate = new Rotate(this.current);
    const { angle, current, minY, minX } = rotate.execute();

    if (rotate.isPossible(current, this.area)) {
      return false;
    }

    this.clear();

    current.forEach((position) => {
      const { y, x } = position;
      this.area[y / 33][x / 33] = 'c';
      this.gameArea.fillStyle = this.current.color;
      this.gameArea.fillRect(x, y, 30, 30);
    });

    const { color, size, type } = this.current;

    this.current = {
      location: current,
      angle, color, size, type, minX, minY
    };
  };

  down = () => {

    if (!this.isPlaying) {
      return this.isPlaying
    }

    if (this.stopDown()) {
      this.clear();

      const location = this.current.location.map((part) => {
        let { y, x } = part;
        const newY = y + 33;
        this.area[newY / 33][x / 33] = "c";
        this.gameArea.fillStyle = this.current.color;
        this.gameArea.fillRect(x, newY, 30, 30);
        return { x, y: newY };
      });

      const { color, size, type, angle, minX } = this.current;

      this.current = {
        color, size, type, angle, minX,
        location: location,
        minY: (this.current.minY + 1)
      };

      return true;
    }

    this.invalid();
    this.checkScore(this.addEmptyLines, this.activateNextPiece, this.printNewScreen);
    return false;
  };

  right = () => {
    if (this.stopRight()) {
      this.clear();

      const current = this.current.location.map((part) => {
        let { y, x } = part;
        const newX = x + 33;
        this.area[y / 33][newX / 33] = "c";
        this.gameArea.fillStyle = this.current.color;
        this.gameArea.fillRect(newX, y, 30, 30);
        return { x: newX, y };
      });

      const { color, size, type, angle, minX, minY } = this.current;

      this.current = {
        color, size, type, angle, minY,
        location: current,
        minX: (minX + 1)
      };
    }
  };

  left = () => {
    if (this.stopLeft()) {
      this.clear();

      const current = this.current.location.map((part) => {
        let { y, x } = part
        const newX = (x - 33);
        this.area[y / 33][newX / 33] = "c";
        this.gameArea.fillStyle = this.current.color;
        this.gameArea.fillRect(newX, y, 30, 30);
        return { x: newX, y };
      });

      const { color, size, type, angle, minX, minY } = this.current;

      this.current = {
        color, size, type, angle, minY,
        location: current,
        minX: (this.current.minX - 1)
      };
    }
  };

  stopDown = () => {

    const position = this.current.location
      .map((element) => {
        return element.y + 33;
      }).indexOf(594);

    if (position != -1) {
      return false;
    }

    const currentLocation = this.current.location;
    for (let i = 0; i < currentLocation.length; i++) {
      const part = currentLocation[i];
      const y = part.y + 33;
      const nextLocation = this.area[y / 33][part.x / 33];
      if (nextLocation != "c" && colors.indexOf(nextLocation) != -1) {
        return false;
      }
    }

    return true;
  };

  stopRight = () => {

    if (!this.isPlaying) {
      return this.isPlaying
    }

    const position = this.current.location
      .map((part) => {
        return part.x + 33;
      }).indexOf(297);

    if (position != -1) {
      return false;
    }

    const currentLocation = this.current.location;
    for (let i = 0; i < currentLocation.length; i++) {
      const part = currentLocation[i];
      const x = part.x + 33;
      const nextLocation = this.area[part.y / 33][x / 33];
      if (nextLocation != "c" && colors.indexOf(nextLocation) != -1) {
        return false;
      }
    }

    return true;
  };

  stopLeft = () => {

    if (!this.isPlaying) {
      return this.isPlaying
    }

    const position = this.current.location
      .map((part) => {
        return part.x - 33;
      }).indexOf(-33);

    if (position != -1) {
      return false;
    }

    const currentLocation = this.current.location;
    for (let i = 0; i < currentLocation.length; i++) {
      const part = currentLocation[i];
      const x = part.x - 33;
      const nextLocation = this.area[part.y / 33][x / 33];
      if (nextLocation != "c" && colors.indexOf(nextLocation) != -1) {
        return false;
      }
    }

    return true;
  };

  downAll = () => {
    let n = true;

    while (n) {
      n = this.down();
    }
  };

  activateNextPiece = () => {

    const { location, color } = this.nextPiece;

    for (let i = 0; i < location.length; i++) {
      const { y, x } = location[i];
      const nextLocation = this.area[y / 33][x / 33];
      if (nextLocation != "c" && colors.indexOf(nextLocation) != -1) {
        alert("Game Over"); // TODO: MELHORAR
        this.endGame = true;
        this.stop(false);
        return false;
      }
    };

    location.forEach((element) => {
      const { y, x } = element;
      this.area[y / 33][x / 33] = "c";
      this.gameArea.fillStyle = color;
      this.gameArea.fillRect(x, y, 30, 30);
    });

    this.current = this.nextPiece;

    this.nextPiece = Tetraminos[random(tetraminos)];
    this.printNextPart();

  };

  printNextPart = () => {
    cleanScreenNextPart(this.gameArea);
    this.nextPiece.location.forEach((part) => {
      this.gameArea.fillStyle = this.nextPiece.color;
      this.gameArea.fillRect(part.x + 290, part.y + 83, 30, 30);
    });
  };

  invalid = () => {
    this.current.location.forEach((element) => {
      this.area[element.y / 33][element.x / 33] = this.current.color;
    });
  };

  clear = () => {
    this.current.location.forEach((element) => {
      this.gameArea.fillStyle = "#FFF";
      this.gameArea.fillRect(element.x, element.y, 30, 30);
      this.area[element.y / 33][element.x / 33] = 0;
    });
  };

  timer = () => {
    this.minute = this.minute ? this.minute : 0;
    this.second = this.second ? this.second : 0;
    this.jobTimer = setInterval(() => {
      if (this.second > 59) {
        this.second = 0;
        this.minute++;
      }

      if (this.second === 30) {
        speed = (this.level >= 5) ? (speed - 40) : (speed - 100);
        this.level++;
        printLevel(this.gameArea, this.level);
        this.stop();
        this.start();
      }

      const second = this.second < 10 ? `0${this.second}` : this.second;
      const minute = this.minute < 10 ? `0${this.minute}` : this.minute;
      printTime(this.gameArea, `${minute}:${second}`);
      this.second++;
    }, 1000);
  };

  start = () => {
    this.job = setInterval(() => {
      this.down();
    }, speed);
    this.isPlaying = true;
  }

  stop = (flag = true) => {
    if (flag) {
      clearInterval(this.job);
    } else {
      clearInterval(this.job);
      clearInterval(this.jobTimer);
    }
  }
}
