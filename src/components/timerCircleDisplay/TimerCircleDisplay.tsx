import React, { CSSProperties } from 'react';
import './_timerCircleDisplay.scss';

type TimerCircleDisplayProps = {
    milliseconds: number;
    total: number;
    color: string;
};

const TimerCircleDisplay: React.FC<TimerCircleDisplayProps> = ({ milliseconds, total, color }) => {
    const offsetValue = 100 - (100 * milliseconds) / total;
    const style: CSSProperties & { '--offsetValue': number; '--strokeColor': string } = {
        '--offsetValue': offsetValue,
        '--strokeColor': color,
    };

    const finishClass =
        total - milliseconds <= 300 || total - milliseconds >= total - 100 ? 'finish' : '';

    return (
        <div className="timer-circle-display">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 34 34">
                <circle
                    cx="16"
                    cy="16"
                    r="15.9155"
                    className="timer-circle-display__background"
                ></circle>
                <circle
                    cx="16"
                    cy="16"
                    r="15.9155"
                    className={`timer-circle-display__progress ${finishClass}`}
                    style={style}
                ></circle>
                <circle
                    cx="16"
                    cy="16"
                    r="15.9155"
                    className={`timer-circle-display__return ${finishClass}`}
                ></circle>
            </svg>
        </div>
    );
};

export default TimerCircleDisplay;
