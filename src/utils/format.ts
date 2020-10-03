export const formatSecondsToMinutes = (timeInSeconds: number): string => {
    const seconds = timeInSeconds % 60;
    const minutes = (timeInSeconds - seconds) / 60;
    const zeroBeforeMinutes = minutes < 10 ? '0' : '';
    const zeroAfterSeconds = seconds === 0 ? '0' : '';
    const zeroBeforeSeconds = seconds < 10 && seconds !== 0 ? '0' : '';
    const secondsSection = `${zeroBeforeSeconds}${seconds}${zeroAfterSeconds}`;
    if (timeInSeconds < 60) return `00:${secondsSection}`;

    return `${zeroBeforeMinutes}${minutes}:${secondsSection}`;
};

export const formatSecondsToMinutesLeftRounded = (timeInSeconds: number): string => {
    const minutes = Math.ceil(timeInSeconds / 60);

    return `${minutes} min left`;
};
