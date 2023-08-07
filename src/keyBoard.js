export class KeyBoard {
    #gameArea
    #keys = {
        a: {
            length: 50,
            x: 335,
            y: 473,
            text: {
                x: 356,
                y: 507,
                describe: 'A'
            }
        },
        d: {
            length: 50,
            x: 441,
            y: 473,
            text: {
                x: 458,
                y: 506,
                describe: 'D'
            }
        },
        w: {
            length: 50,
            x: 388,
            y: 420,
            text: {
                x: 403,
                y: 454,
                describe: 'W'
            }
        },
        s: {
            length: 50,
            x: 388,
            y: 473,
            text: {
                x: 406,
                y: 505,
                describe: 'S'
            }
        },
        space: {
            length: 156,
            x: 335,
            y: 526,
            text: {
                x: 386,
                y: 557,
                describe: 'space'
            }
        },
        enter: {
            length: 106,
            x: 365,
            y: 276,
            text: {
                x: 395,
                y: 307,
                describe: 'Enter'
            }
        },
        p: {
            length: 106,
            x: 365,
            y: 329,
            text: {
                x: 390,
                y: 360,
                describe: 'Pause'
            }
        }
    }

    constructor(gameArea) {
        this.#gameArea = gameArea;
        for (const key in this.#keys) {
            this.printKeyBoards(key);
        }
    }

    #colorsHexadecimal = (short = false) => {
        const maxHex = short ? 0xFFF : 0xFFFFFF;
        return '#' + parseInt((Math.random() * maxHex)).toString(16).padStart(short ? 3 : 6, '0');
    }

    printKeyBoards = (key, eventKey = 'keyup') => {
        const { y, x, length, text } = this.#keys[key];
        const lengthSapce = length != 50 ? 50 : length;
        const color = eventKey === 'keydown' ? this.#colorsHexadecimal() : '#FFF';
        this.#gameArea.fillStyle = color;
        this.#gameArea.fillRect((x - 1), (y - 1), (length + 2), (lengthSapce + 2));
        this.#gameArea.fillStyle = '#FF0';
        this.#gameArea.strokeRect(x, y, length, lengthSapce);

        this.#gameArea.fillStyle = 'black';
        this.#gameArea.font = '20px Arial';
        this.#gameArea.fillText(text.describe, text.x, text.y);
    };
}