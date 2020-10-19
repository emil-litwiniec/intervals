import { formatSecondsToMinutesLeftRounded, formatSecondsToMinutes } from '@/utils/format';

describe('format utils', () => {
    describe('formatSecondsToMinutesLeftRounded', () => {
        test('should return "0" when 0', () => {
            expect(formatSecondsToMinutesLeftRounded(0)).toBe('0');
        });
        test('should return "2" when 120', () => {
            expect(formatSecondsToMinutesLeftRounded(120)).toBe('2');
        });
        test('should round up to integer ', () => {
            expect(formatSecondsToMinutesLeftRounded(119)).toBe('2');
        });
    });

    describe('formatSecondsToMinutes', () => {
        test('should return valid output for 0 seconds', () => {
            expect(formatSecondsToMinutes(0)).toBe('00:00')
        })
        test('should return valid output for 60 seconds', () => {
            expect(formatSecondsToMinutes(60)).toBe('01:00')
        })
        test('should return valid output for 3601 seconds', () => {
            expect(formatSecondsToMinutes(3601)).toBe('60:01')
        })
    })
});
