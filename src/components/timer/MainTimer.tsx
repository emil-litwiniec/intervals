import React, { Component } from 'react';

export type ChildCallables = {
    startTimer(): void;
    pauseTimer(): void;
    resumeTimer(): void;
    resetTimer(): void;
}

type MainTimerProps = {
    initialSeconds: number;
    onTimerFinished(): void;
    setCallables(childCallables: ChildCallables): void;
    id: string;
};

type MainTimerState = {
    secondsLeft: number;
    isTimerPaused: boolean;
    remaining: number;
    startingTime: number;
    intervalId: NodeJS.Timeout | null;
};

class MainTimer extends Component<MainTimerProps, MainTimerState> {
    constructor(props: MainTimerProps) {
        super(props);

        this.state = {
            secondsLeft: 0,
            isTimerPaused: true,
            remaining: 0,
            startingTime: 0,
            intervalId: null,
        };
    }

    componentDidMount() {
        this.setState({ secondsLeft: this.props.initialSeconds });
        this.props.setCallables({
            startTimer: this.startTimer,
            pauseTimer: this.pauseTimer,
            resumeTimer: this.resumeTimer,
            resetTimer: this.resetTimer,
        });
    }

    componentDidUpdate(prevProps: MainTimerProps) {
        if (prevProps.id !== this.props.id) {
            this.setState({ secondsLeft: this.props.initialSeconds });
        }

        if (this.state.secondsLeft === 0) {
            this.props.onTimerFinished();
            this.clear();
        }
    }

    startTimer = () => {
        this.clear();
        this.run();
    };

    resetTimer = () => {
        this.clear();
        this.setState({ remaining: 0, startingTime: 0, secondsLeft: this.props.initialSeconds });
    };

    pauseTimer = () => {
        this.clear();
        this.setState((state) => ({
            remaining: 1000 - new Date(new Date().getTime() - state.startingTime).getMilliseconds(),
            isTimerPaused: true,
        }));
    };

    resumeTimer = () => {
        if (!this.state.isTimerPaused) return;
        if (this.state.remaining) {
            setTimeout(() => {
                this.run();
                this.setState({ isTimerPaused: false });
            }, this.state.remaining);
        } else {
            this.startTimer();
            this.setState({ isTimerPaused: false });
        }
    };

    run = () => {
        this.clear();
        const intervalId = setInterval(() => {
            this.setState((state) => ({ secondsLeft: state.secondsLeft - 1 }));
        }, 1000);

        this.setState({
            startingTime: new Date().getTime(),
            intervalId,
        });
    };

    clear = () => {
        if (!this.state.intervalId) return;
        clearInterval(this.state.intervalId);
    };

    render() {
        return (
            <>
                <p>{this.state.secondsLeft}</p>
            </>
        );
    }
}

export default MainTimer;
