import React, { Component } from 'react';
import MainTimer, { ChildCallables } from '@/components/timer/MainTimer';
import Button from '@/components/button/Button';
import { v4 as uuidv4 } from 'uuid';

type WorkoutPlayerState = {
    seconds: number;
    id: string;
};

class WorkoutPlayer extends Component<{}, WorkoutPlayerState> {
    childCallables: ChildCallables | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            seconds: 6,
            id: uuidv4(),
        };
    }

    onTimerFinished = () => {
        // TODO: trigger next workout interval
        this.setState({
            seconds: 6,
            id: uuidv4(),
        });
    };

    setChildCallables = (callables: ChildCallables) => {
        this.childCallables = callables;
    };

    startTimer = () => {
        this.childCallables?.startTimer();
    };
    pauseTimer = () => {
        this.childCallables?.pauseTimer();
    };

    resumeTimer = () => {
        this.childCallables?.resumeTimer();
    };

    resetTimer = () => {
        this.childCallables?.resetTimer();
    };

    render() {
        return (
            <>
                <MainTimer
                    initialSeconds={this.state.seconds}
                    id={this.state.id}
                    onTimerFinished={this.onTimerFinished}
                    setCallables={this.setChildCallables}
                />
                <Button handleClick={this.startTimer}>Start</Button>
                <Button handleClick={this.pauseTimer}>Pause</Button>
                <Button handleClick={this.resumeTimer}>Resume</Button>
                <Button handleClick={this.resetTimer}>Reset</Button>
            </>
        );
    }
}

export default WorkoutPlayer;
