import { Rotate } from "../src/rotacao";

describe('Rotate the T-piece', () => {
    describe('Should be rotate the T-piece from 0 to 90', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 99, y: 33 },
                { x: 165, y: 33 }],
            angle: '0',
            color: 'pink',
            size: 3,
            type: 'T',
            minX: 3,
            minY: 0
        });

        const { angle, current, minY, minX } = rotate.execute();

        test('when the angle is 0 to 90', () => {
            expect(angle).toEqual('90');
        });

        test('when array is at 0 to 90', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 132, y: 66 }
            ]);
        });
    });

    describe('Should be rotate the T-piece from 90 to 180', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 132, y: 66 }],
            angle: '90',
            color: 'pink',
            size: 3,
            type: 'T',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 90 to 180', () => {
            expect(angle).toEqual('180');
        });

        test('when array is at  90 to 180', () => {
            expect(current).toEqual([
                { x: 99, y: 33 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 132, y: 66 }
            ]);
        });
    });

    describe('Should be rotate the T-piece from 180 to 270', () => {

        const rotate = new Rotate({
            location: [
                { x: 99, y: 33 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 132, y: 66 }],
            angle: '180',
            color: 'pink',
            size: 3,
            type: 'T',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 180 to 270', () => {
            expect(angle).toEqual('270');
        });

        test('when array is at  180 to 270', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 99, y: 33 },
                { x: 132, y: 33 },
                { x: 132, y: 66 }
            ]);
        });
    });

    describe('Should be rotate the T-piece from 270 to 0', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 99, y: 33 },
                { x: 132, y: 33 },
                { x: 132, y: 66 }],
            angle: '270',
            color: 'pink',
            size: 3,
            type: 'T',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 270 to 0', () => {
            expect(angle).toEqual('0');
        });

        test('when array is at  270 to 0', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 99, y: 33 },
                { x: 132, y: 33 },
                { x: 165, y: 33 }
            ]);
        });
    });
});

describe('Rotate the Z-piece', () => {
    describe('Should be rotate the Z-piece from 0 to 90', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 99, y: 33 },
                { x: 165, y: 0 },
                { x: 132, y: 33 }
            ],
            angle: '0',
            color: 'green',
            size: 3,
            type: 'Z',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 0 to 90', () => {
            expect(angle).toEqual('90');
        });

        test('when array is at 0 to 90', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 165, y: 66 }
            ]);
        });
    });

    describe('Should be rotate the Z-piece from 90 to 270', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 165, y: 66 }
            ],
            angle: '90',
            color: 'green',
            size: 3,
            type: 'Z',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 90 to 270', () => {
            expect(angle).toEqual('270');
        });

        test('when array is at 90 to 270', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 165, y: 0 },
                { x: 99, y: 33 },
                { x: 132, y: 33 }
            ]);
        });
    });

    describe('Should be rotate the T-piece from 270 to 90', () => {

        const rotate = new Rotate({
            location: [
                { x: 132, y: 0 },
                { x: 99, y: 33 },
                { x: 165, y: 0 },
                { x: 132, y: 33 }
            ],
            angle: '270',
            color: 'pink',
            size: 3,
            type: 'T',
            minX: 3,
            minY: 0
        });

        const { angle, current } = rotate.execute();

        test('when the angle is 270 to 90', () => {
            expect(angle).toEqual('0');
        });

        test('when array is at 270 to 90', () => {
            expect(current).toEqual([
                { x: 132, y: 0 },
                { x: 132, y: 33 },
                { x: 165, y: 33 },
                { x: 165, y: 66 }
            ]);
        });
    });
});