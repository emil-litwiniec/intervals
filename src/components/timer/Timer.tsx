import React, { Component } from 'react';
import TimerCircleDisplay from '@/components/timerCircleDisplay/TimerCircleDisplay';
import { formatSecondsToMinutes, formatSecondsToMinutesLeftRounded } from '@/utils/format';
import './_timer.scss';
import { soundHigh, soundLow } from '@/utils/sounds';
import { isMuttedSelector } from '@/store/slices/settings';
import { connect } from 'react-redux';

export type ChildCallables = {
    startTimer(): void;
    pauseTimer(): void;
    resetTimer(): void;
    setMillisecondsLeft(seconds: number): void;
};

type TimerProps = {
    initialSeconds: number;
    onTimerFinished(): void;
    setCallables(childCallables: ChildCallables): void;
    id: string;
    className: string;
    circularDisplay?: boolean;
    showMinutesLeft?: boolean;
    sound?: boolean;
    isMutted: boolean;
};

type TimerState = {
    isTimerPaused: boolean;
    millisecondsLeft: number;
};

class Timer extends Component<TimerProps, TimerState> {
    timeout: NodeJS.Timeout | null = null;
    constructor(props: TimerProps) {
        super(props);

        this.state = {
            isTimerPaused: true,
            millisecondsLeft: 0,
        };
    }

    componentDidMount() {
        this.setState({ millisecondsLeft: this.props.initialSeconds * 1000 });
        this.props.setCallables({
            startTimer: this.start,
            pauseTimer: this.pause,
            resetTimer: this.reset,
            setMillisecondsLeft: this.setMillisecondsLeft,
        });
    }

    componentDidUpdate(prevProps: TimerProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ millisecondsLeft: this.props.initialSeconds * 1000 });
        }
        if (!this.props.isMutted) {
            const shouldPlaySound =
                this.state.millisecondsLeft <= 3000 &&
                this.state.millisecondsLeft !== 0 &&
                this.state.millisecondsLeft % 1000 === 0;
            shouldPlaySound && soundLow.play();
        }
    }

    reset = () => {
        this.clear();
        this.setState({ millisecondsLeft: this.props.initialSeconds * 1000 });
    };

    pause = () => {
        this.clear();
        this.setState({
            isTimerPaused: true,
        });
    };

    start = () => {
        !this.props.isMutted && soundHigh.play();
        this.clear();
        this.setState((state) => ({
            isTimerPaused: false,
            millisecondsLeft: state.millisecondsLeft,
        }));

        this.timeout = setInterval(() => {
            const newTime = this.state.millisecondsLeft - 50;
            if (newTime >= 0) {
                this.setState({
                    millisecondsLeft: newTime,
                });
            } else {
                this.timeout && clearInterval(this.timeout);
                this.setState({ isTimerPaused: true });
                this.props.onTimerFinished();
            }
        }, 50);
    };

    setMillisecondsLeft = (seconds: number) => {
        this.setState({ millisecondsLeft: seconds * 1000 });
    };

    clear = () => {
        if (!this.timeout) return;
        clearInterval(this.timeout);
    };

    render() {
        const parentClassName = this.props.className ? this.props.className : '';
        const { circularDisplay = false } = this.props;
        const seconds = Math.ceil(this.state.millisecondsLeft / 1000);
        const { showMinutesLeft: showMinsLeft } = this.props;
        return (
            <div className={`timer__wrapper ${parentClassName}`}>
                <span className="timer__text-display">
                    {showMinsLeft
                        ? ` ${formatSecondsToMinutesLeftRounded(seconds)} min left`
                        : formatSecondsToMinutes(seconds)}
                </span>

                {circularDisplay && (
                    <TimerCircleDisplay
                        milliseconds={
                            this.props.initialSeconds * 1000 - this.state.millisecondsLeft
                        }
                        total={this.props.initialSeconds * 1000}
                        className="timer__circular-display"
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isMutted: isMuttedSelector(state),
});

export default connect(mapStateToProps)(Timer);
