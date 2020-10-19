import { calcDragDirection, DragDirection, Point } from '@/utils/drag';

const defaultThreshold = { horizontal: 20, vertical: 20 };
const initPos = new Point(0, 0);
describe('drag utils', () => {
    describe('calcDragDirection', () => {
        test('valid ouput when no drag', () => {
            const currentPos = new Point(0, 0);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(
                DragDirection.NONE
            );
        });

        test('valid ouput when dragged below threshold', () => {
            const currentPos = new Point(defaultThreshold.horizontal - 1, 0);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(
                DragDirection.NONE
            );
        });

        test('valid ouput when dragged over threshold', () => {
            const currentPos = new Point(30, 0);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).not.toBe(
                DragDirection.NONE
            );
        });

        test('valid ouput when dragged left', () => {
            const currentPos = new Point(-30, 0);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(
                DragDirection.LEFT
            );
        });

        test('valid ouput when dragged right', () => {
            const currentPos = new Point(30, 0);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(
                DragDirection.RIGHT
            );
        });

        test('valid ouput when dragged down', () => {
            const currentPos = new Point(0, 30);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(
                DragDirection.DOWN
            );
        });

        test('valid ouput when dragged up', () => {
            const currentPos = new Point(0, -30);
            expect(calcDragDirection(currentPos, initPos, defaultThreshold)).toBe(DragDirection.UP);
        });
    });
});
