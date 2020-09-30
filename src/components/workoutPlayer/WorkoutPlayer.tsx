import React, { Component } from 'react';
import MainTimer, { ChildCallables } from '@/components/timer/MainTimer';
import Button from '@/components/button/Button';
import { v4 as uuidv4 } from 'uuid';

type WorkoutPlayerState = {
    seconds: number;
    id: string;
    isTimerOn: boolean;
};

class WorkoutPlayer extends Component<{}, WorkoutPlayerState> {
    childCallables: ChildCallables | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            seconds: 15,
            id: uuidv4(),
            isTimerOn: false,
        };
    }

    onTimerFinished = () => {
        // TODO: trigger next workout interval
        this.setState({
            seconds: 5,
            id: uuidv4(),
        });
        this.startTimer();
    };

    setChildCallables = (callables: ChildCallables) => {
        this.childCallables = callables;
    };

    startTimer = () => {
        this.childCallables?.startTimer();
        this.setState({ isTimerOn: true });
    };
    pauseTimer = () => {
        this.childCallables?.pauseTimer();
        this.setState({ isTimerOn: false });
    };

    resetTimer = () => {
        this.childCallables?.resetTimer();
        this.setState({ isTimerOn: false });
    };

    render() {
        return (
            <>
                <MainTimer
                    initialSeconds={this.state.seconds}
                    id={this.state.id}
                    onTimerFinished={this.onTimerFinished}
                    setCallables={this.setChildCallables}
                    color={'coral'}
                />

                {this.state.isTimerOn ? (
                    <Button handleClick={this.pauseTimer}>Pause</Button>
                ) : (
                    <Button handleClick={this.startTimer}>Start</Button>
                )}

                <Button handleClick={this.resetTimer}>Reset</Button>
            </>
        );
    }
}

export default WorkoutPlayer;
