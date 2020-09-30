import React, { Component } from 'react';
import TimerCircleDisplay from '@/components/timerCircleDisplay/TimerCircleDisplay';
import { formatSecondsToMinutes } from '@/utils/format';

export type ChildCallables = {
    startTimer(): void;
    pauseTimer(): void;
    resetTimer(): void;
};

type MainTimerProps = {
    initialSeconds: number;
    onTimerFinished(): void;
    setCallables(childCallables: ChildCallables): void;
    id: string;
    color: string;
};

type MainTimerState = {
    isTimerPaused: boolean;
    millisecondsLeft: number;
};

class MainTimer extends Component<MainTimerProps, MainTimerState> {
    timeout: NodeJS.Timeout | null = null;
    constructor(props: MainTimerProps) {
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
        });
    }

    componentDidUpdate(prevProps: MainTimerProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ millisecondsLeft: this.props.initialSeconds * 1000 });
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
        this.clear();
        this.setState((state) => ({
            isTimerPaused: false,
            millisecondsLeft: this.state.millisecondsLeft,
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

    clear = () => {
        if (!this.timeout) return;
        clearInterval(this.timeout);
    };

    render() {
        return (
            <>
                <p style={{ fontSize: '2rem', margin: '2rem' }}>
                    {formatSecondsToMinutes(Math.ceil(this.state.millisecondsLeft / 1000))}
                </p>
                <TimerCircleDisplay
                    milliseconds={this.props.initialSeconds * 1000 - this.state.millisecondsLeft}
                    total={this.props.initialSeconds * 1000}
                    color={this.props.color}
                />
            </>
        );
    }
}

export default MainTimer;
