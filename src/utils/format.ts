export const formatSecondsToMinutes = (timeInSeconds: number): string => {
    if (timeInSeconds < 60) return `00:${timeInSeconds}`;

    const seconds = timeInSeconds % 60;
    const minutes = (timeInSeconds - seconds) / 60;
    const zeroBeforeMinutes = minutes < 10 ? '0' : '';
    const zeroAfterSeconds = seconds === 0 ? '0' : '';
    const zeroBeforeSeconds = seconds < 10 && seconds !== 0 ? '0' : '';

    return `${zeroBeforeMinutes}${minutes}:${zeroBeforeSeconds}${seconds}${zeroAfterSeconds}`;
};
