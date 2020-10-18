import { roundBy5 } from '../../utils/math';

describe('math utils', () => {
    describe('roundBy5', () => {
        test('should return 10 when 8', () => {
            expect(roundBy5(8)).toBe(10);
        });
        test('should return 10 when 10', () => {
            expect(roundBy5(10)).toBe(10);
        });
        test('should return 0 when 0', () => {
            expect(roundBy5(0)).toBe(0);
        });
    });
});
