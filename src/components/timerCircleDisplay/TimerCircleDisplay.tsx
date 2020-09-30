import React, { CSSProperties } from 'react';
import './_timerCircleDisplay.scss';

type TimerCircleDisplayProps = {
    milliseconds: number;
    total: number;
    className: string;
};

const TimerCircleDisplay: React.FC<TimerCircleDisplayProps> = ({
    milliseconds,
    total,
    className = '',
}) => {
    const offsetValue = 100 - (100 * milliseconds) / total;
    const style: CSSProperties & { '--offsetValue': number } = {
        '--offsetValue': offsetValue,
    };

    const highlightClass =
        total - milliseconds <= 300 || total - milliseconds >= total - 100 ? 'highlight' : '';

    return (
        <div className={`timer-circle-display ${className}`}>
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
                    className={`timer-circle-display__progress ${highlightClass}`}
                    style={style}
                ></circle>
                <circle
                    cx="16"
                    cy="16"
                    r="15.9155"
                    className={`timer-circle-display__return ${highlightClass}`}
                ></circle>
            </svg>
        </div>
    );
};

export default TimerCircleDisplay;
