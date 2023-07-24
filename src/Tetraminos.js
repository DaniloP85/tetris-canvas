const Tetraminos = {
    T: {
        location: [
            { x: 132, y: 0 },
            { x: 132, y: 33 },
            { x: 99, y: 33 },
            { x: 165, y: 33 }
        ],
        color: 'pink',
        size: 3,
        type: 'T',
        angle: '0',
        minX: 3,
        minY: 0
    },

    I: {
        location: [
            { x: 165, y: 33 },
            { x: 99, y: 33 },
            { x: 132, y: 33 },
            { x: 198, y: 33 }
        ],
        color: 'aqua',
        size: 4,
        type: 'I',
        angle: '0',
        minX: 3,
        minY: 0
    },

    L: {
        location: [
            { x: 99, y: 33 },
            { x: 99, y: 0 },
            { x: 132, y: 0 },
            { x: 165, y: 0 }
        ],
        color: 'orange',
        size: 3,
        type: 'L',
        angle: '0',
        minX: 3,
        minY: 0
    },

    J: {
        location: [
            { x: 132, y: 0 },
            { x: 99, y: 0 },
            { x: 165, y: 0 },
            { x: 165, y: 33 }
        ],
        color: 'blue',
        size: 3,
        type: 'J',
        angle: '0',
        minX: 3,
        minY: 0
    },

    O: {
        location: [
            { x: 99, y: 0 },
            { x: 99, y: 33 },
            { x: 132, y: 0 },
            { x: 132, y: 33 }
        ],
        color: 'yellow',
        size: 2,
        type: 'O',
        angle: '0',
        minX: 3,
        minY: 0
    },

    S: {
        location: [
            { x: 99, y: 0 },
            { x: 132, y: 33 },
            { x: 132, y: 0 },
            { x: 165, y: 33 }
        ],
        color: 'red',
        size: 3,
        type: 'S',
        angle: '0',
        minX: 3,
        minY: 0
    },

    Z: {
        location: [
            { x: 132, y: 0 },
            { x: 99, y: 33 },
            { x: 165, y: 0 },
            { x: 132, y: 33 }
        ],
        color: 'green',
        size: 3,
        type: 'Z',
        angle: '0',
        minX: 3,
        minY: 0
    }
};

export { Tetraminos };