import { theCorners } from "./utils";
const colors = ["pink", "aqua", "orange", "blue", "yellow", "red", "green"];

export class Rotate {
    #part

    constructor(part) {
        this.#part = part;
    }

    execute = () => {
        const { positions, minY, minX } = this.#makeConvertPositions(this.#part);
        let angle = this.#findNextAngle();
        const parts90 = new Array('Z', 'S', 'I'); // TODO: MELHORAR
        let invertedPiece;

        if (parts90.indexOf(this.#part.type) != -1) {
            switch (angle) {
                case "90":
                    invertedPiece = this.#rotate90(positions);
                    break;
                case "270":
                    invertedPiece = this.#rotate90(this.#rotate90(this.#rotate90(positions)));
                    break;
                default:
                    throw 'Parameter is not a number!';
            }
        } else {
            invertedPiece = this.#rotate90(positions);
        }

        const current = [];

        for (let i = 0; i < invertedPiece.length; i++) {
            const element = invertedPiece[i];
            for (let j = 0; j < element.length; j++) {
                if (invertedPiece[i][j]) {
                    const y = ((i + minY) * 33);
                    const x = ((j + minX) * 33);
                    current.push({ x, y });
                }
            }
        }

        return { angle, current, minY, minX };
    }

    isPossible = (current, matrix) => {

        //Verificar lado direito
        let position = current.map((part) => {
            return part.x;
        }).indexOf(297);

        if (position != -1) {
            return true;
        }

        //Verificar lado equerdo
        position = current.map((part) => {
            return part.x;
        }).indexOf(-33);

        if (position != -1) {
            return true;
        }

        // verifica lado inferior
        position = current.map((part) => {
            return part.y;
        }).indexOf(594);

        if (position != -1) {
            return true;
        }

        // verifica se as posicoes estão ocupadas
        for (let i = 0; i < current.length; i++) {
            const { y, x } = current[i];
            const nextLocation = matrix[y / 33][x / 33];
            if (nextLocation != "c" && colors.indexOf(nextLocation) != -1) {
                return true;
            }
        }
    }

    #findNextAngle = () => {
        const localizaAngulo = theCorners.indexOf(this.#part.angle);
        let angle = localizaAngulo === 3 ? 0 : localizaAngulo + 1;

        const parts90 = new Array('Z', 'S', 'I');

        if (parts90.indexOf(this.#part.type) != -1) {
            angle = this.#part.angle === "90" ? 3 : 1;
        }

        return theCorners[angle];
    }

    #makeConvertPositions = (part) => {
        let positions = this.#emptyMatrix(part.size);

        const pY = [];
        const pX = [];
        part.location.forEach((element) => {
            const y = element.y / 33;
            const x = element.x / 33;
            pX.push(x);
            pY.push(y);
        });

        const minX = part.minX;
        const minY = part.minY;

        part.location.forEach((element) => {
            const y = ((element.y / 33) - minY);
            const x = ((element.x / 33) - minX);
            positions[y][x] = "c";
        });

        return { positions, minY, minX };
    }

    #rotate90 = (matrix) => {

        let matrixEmpty = this.#emptyMatrix(matrix.length);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                matrixEmpty[j][matrix.length - 1 - i] = matrix[i][j];
            }
        }

        return matrixEmpty;
    }

    #emptyMatrix = (size) => {
        let matrix = [];
        for (let i = 0; i < size; i++) {
            let empty = [];
            for (let j = 0; j < size; j++) {
                empty.push(0);
            }

            matrix.push(empty);
        }

        return matrix;
    }
}