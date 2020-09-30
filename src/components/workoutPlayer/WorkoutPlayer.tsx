import React, { Component, CSSProperties } from 'react';
import MainTimer, { ChildCallables } from '@/components/timer/MainTimer';
import Button from '@/components/button/Button';
import { IconPlay, IconPause, IconReset, IconNext, IconPrev } from '@/misc/icons';
import { v4 as uuidv4 } from 'uuid';
import './_workoutPlayer.scss';

type WorkoutPlayerState = {
    seconds: number;
    id: string;
    isTimerOn: boolean;
    color: string;
};

class WorkoutPlayer extends Component<{}, WorkoutPlayerState> {
    childCallables: ChildCallables | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            seconds: 15,
            id: uuidv4(),
            isTimerOn: false,
            color: '#525ec4',
        };
    }

    onTimerFinished = () => {
        // TODO: trigger next workout interval
        this.handleNextInterval();
        this.setState({
            seconds: 18,
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

    handleNextInterval = () => {
        console.log('should handle next interval');
        this.setState({
            color: 'coral',
        });
    };

    handlePreviousInterval = () => {
        console.log('should handle previous interval');
        this.setState({
            color: 'cornflowerblue',
        });
    };

    render() {
        const style: CSSProperties = { backgroundColor: this.state.color };
        return (
            <div className="workout-player" style={style}>
                <MainTimer
                    initialSeconds={this.state.seconds}
                    id={this.state.id}
                    onTimerFinished={this.onTimerFinished}
                    setCallables={this.setChildCallables}
                    className="workout-player__timer"
                />
                <div className="workout-player__info">
                    <h4 className="workout-player__interval-title">High Interval</h4>
                    <h5 className="workout-player__subsection-title">Push-Ups</h5>
                </div>
                <div className="workout-player__controls">
                    <Button handleClick={this.handlePreviousInterval}>
                        <IconPrev className="workout-player__icon" />
                    </Button>

                    {this.state.isTimerOn ? (
                        <Button handleClick={this.pauseTimer}>
                            <IconPause className="workout-player__icon" />
                        </Button>
                    ) : (
                        <Button handleClick={this.startTimer}>
                            <IconPlay className="workout-player__icon" />
                        </Button>
                    )}

                    <Button handleClick={this.resetTimer}>
                        <IconReset className="workout-player__icon" />
                    </Button>

                    <Button handleClick={this.handleNextInterval}>
                        <IconNext className="workout-player__icon" />
                    </Button>
                </div>
            </div>
        );
    }
}

export default WorkoutPlayer;
