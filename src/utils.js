const theCorners = ["0", "90", "180", "270"];
const tetraminos = ["O", "I", "L", "J", "T", "Z", "S"];

const printScreenGame = (gameArea) => {
    let matriz = [];
    for (let i = 0; i < 18; i++) {
        const linha = (i * 33);
        let colunas = [];
        for (let j = 0; j < 9; j++) {
            const coluna = (j * 33);
            gameArea.fillStyle = "#FFF";
            gameArea.strokeRect(coluna, linha, 30, 30);
            gameArea.fillRect(coluna, linha, 30, 30);
            colunas.push(0);
        }
        matriz.push(colunas);
    }
    return matriz;
};

const random = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

const printScore = (gameArea, score = 0) => {

    gameArea.fillStyle = "#FFF";
    gameArea.fillRect(300, 0, 240, 30);

    gameArea.fillStyle = "black";
    gameArea.font = "20px Arial";
    gameArea.fillText("Score: ", 300, 20);
    gameArea.fillText(score, 360, 21);
};

const printLevel = (gameArea, level = 0) => {

    gameArea.fillStyle = "#FFF";
    gameArea.fillRect(300, 200, 240, 30);

    gameArea.fillStyle = "black";
    gameArea.font = "20px Arial";
    gameArea.fillText("Level: ", 300, 220);
    gameArea.fillText(level, 360, 220);
};

const printTime = (gameArea, time = 0) => {

    gameArea.fillStyle = "#FFF";
    gameArea.fillRect(300, 240, 240, 30);

    gameArea.fillStyle = "black";
    gameArea.font = "20px Arial";
    gameArea.fillText("Time: ", 300, 260);
    gameArea.fillText(time, 360, 260);
};

const printScreenNextPart = (gameArea) => {
    gameArea.lineWidth = 0.1;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            const x = (j * 33);
            const y = (i * 33);
            gameArea.fillStyle = "#FFF";
            gameArea.strokeRect((x + 356), (y + 50), 30, 30);
            gameArea.fillRect((x + 356), (y + 50), 30, 30);
        }
    }
};

const cleanScreenNextPart = (gameArea) => {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            const x = (j * 33);
            const y = (i * 33);
            gameArea.fillStyle = "#FFF";
            //gameArea.strokeRect(x + 356, y + 50, 30, 30);
            gameArea.fillRect((x + 356), (y + 50), 30, 30);
        }
    }
}

let formatador = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export { printTime, printScreenGame, random, printScore, printScreenNextPart, theCorners, tetraminos, cleanScreenNextPart, printLevel, formatador };