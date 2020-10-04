import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import Timer, { ChildCallables } from '@/components/timer/Timer';
import Button from '@/components/button/Button';

import { IconPlay, IconPause, IconReset, IconNext, IconPrev } from '@/misc/icons';
import './_workoutPlayer.scss';
import { currentWorkout, WorkoutData, Interval } from '@/store/slices/workouts';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type WorkoutPlayerState = {
    isTimerOn: boolean;
    hasWorkoutFinished: boolean;
    currentStepIndex: number;
};

type WorkoutPlayerProps = RouteComponentProps & {
    workout: WorkoutData | null;
};

class WorkoutPlayer extends Component<WorkoutPlayerProps, WorkoutPlayerState> {
    intervalTimerCallables: ChildCallables | null = null;
    totalTimerCallables: ChildCallables | null = null;
    componentDidMount() {}

    constructor(props: WorkoutPlayerProps) {
        super(props);
        this.state = {
            isTimerOn: false,
            currentStepIndex: 0,
            hasWorkoutFinished: false,
        };
    }

    componentDidUpdate(prevProps: WorkoutPlayerProps, prevState: WorkoutPlayerState) {
        const hasStepIndexChanged = prevState.currentStepIndex !== this.state.currentStepIndex;
        if (hasStepIndexChanged) {
            const isOverLastStepIndex = this.state.currentStepIndex > this.lastStepIndex;
            this.setState({ hasWorkoutFinished: isOverLastStepIndex });
            isOverLastStepIndex && setTimeout(() => this.props.history.push('/'), 5000);
        }
    }

    onTimerFinished = () => {
        this.handleNextInterval();
        if (this.getInterval(this.state.currentStepIndex)) this.startTimer();
    };

    startTimer = () => {
        if (this.state.hasWorkoutFinished) return;
        this.intervalTimerCallables?.startTimer();
        this.totalTimerCallables?.startTimer();
        this.setState({ isTimerOn: true });
    };

    pauseTimer = () => {
        this.intervalTimerCallables?.pauseTimer();
        this.totalTimerCallables?.pauseTimer();
        this.setState({ isTimerOn: false });
    };

    resetTimer = () => {
        this.intervalTimerCallables?.resetTimer();
        this.totalTimerCallables?.pauseTimer();
        this.setState({ isTimerOn: false }, this.updateTotalTimer);
    };

    updateTotalTimer = () => {
        this.totalTimerCallables?.setMillisecondsLeft(this.totalTimeLeftFromStep);
    };

    handleNextInterval = () => {
        this.setState(
            (state) => ({
                currentStepIndex: state.currentStepIndex + 1,
            }),
            this.updateTotalTimer
        );
    };

    handlePreviousInterval = () => {
        if (this.state.currentStepIndex === 0) return;
        this.setState(
            (state) => ({
                currentStepIndex: state.currentStepIndex - 1,
            }),
            this.updateTotalTimer
        );
    };

    getInterval(stepIndex: number): Interval | null {
        const workout = this.props.workout;
        if (!workout) return null;
        const { pattern } = workout;
        const isValidStepIndex = stepIndex <= this.lastStepIndex && stepIndex >= 0;

        switch (stepIndex) {
            case 0:
                return workout.startInterval;
            case this.lastStepIndex:
                return workout.endInterval;

            default:
                if (isValidStepIndex) {
                    const subsectionIndex = (stepIndex - 1) % pattern.length;
                    return pattern[subsectionIndex];
                } else return null;
        }
    }

    get totalTimeLeftFromStep() {
        let totalTimeLeft = 0;
        for (let i = this.state.currentStepIndex; i <= this.lastStepIndex; i++) {
            const intervalDuration = this.getInterval(i)?.duration || 0;
            totalTimeLeft += intervalDuration;
        }
        return totalTimeLeft;
    }

    get lastStepIndex() {
        const workout = this.props.workout;
        if (!workout) return 0;
        const { iterations, pattern } = workout;
        return pattern.length * iterations + 1;
    }

    get currentIteration(): number {
        const stepIndex = this.state.currentStepIndex;
        const workout = this.props.workout;
        if (!workout) return 1;
        const { pattern } = workout;
        const iteration = Math.floor(stepIndex / pattern.length);
        return iteration;
    }

    render() {
        const currentInterval = this.getInterval(this.state.currentStepIndex);

        const style: CSSProperties = {
            backgroundColor: currentInterval ? currentInterval.color : 'red',
        };

        const hiddenPreviousButtonClass = this.state.currentStepIndex === 0 ? 'hidden' : '';
        const totalWorkoutTimer = !this.state.hasWorkoutFinished && (
            <div className="workout-player__additional-info">
                <Timer
                    id="totalTimer"
                    initialSeconds={this.totalTimeLeftFromStep}
                    onTimerFinished={() => {}}
                    setCallables={(callables: ChildCallables) =>
                        (this.totalTimerCallables = callables)
                    }
                    className="workout-player__total-timer"
                    showMinutesLeft
                />
                <span className="workout-player__step-counter">{`${this.state.currentStepIndex} / ${this.lastStepIndex}`}</span>
            </div>
        );
        const currentIntervalTimer = currentInterval && !this.state.hasWorkoutFinished && (
            <>
                <Timer
                    initialSeconds={currentInterval.duration}
                    id={currentInterval.id}
                    onTimerFinished={this.onTimerFinished}
                    setCallables={(callables: ChildCallables) =>
                        (this.intervalTimerCallables = callables)
                    }
                    className="workout-player__timer"
                    circularDisplay
                    sound={true}
                />
                <div className="workout-player__info">
                    {totalWorkoutTimer}

                    <h4 className="workout-player__interval-title">{currentInterval!.mainTitle}</h4>
                    <h5 className="workout-player__subsection-title">
                        {currentInterval.subsectionTitles &&
                            currentInterval.subsectionTitles[this.currentIteration]}
                    </h5>
                </div>
            </>
        );

        const workoutFinished = this.state.hasWorkoutFinished && (
            <div className="workout-player__finished">Good job!</div>
        );

        const playPauseButton = this.state.isTimerOn ? (
            <Button handleClick={this.pauseTimer}>
                <IconPause className="workout-player__icon" />
            </Button>
        ) : (
            <Button handleClick={this.startTimer}>
                <IconPlay className="workout-player__icon" />
            </Button>
        );

        const workoutControls = !this.state.hasWorkoutFinished && (
            <div className="workout-player__controls">
                <Button
                    handleClick={this.handlePreviousInterval}
                    additionalClassName={hiddenPreviousButtonClass}
                >
                    <IconPrev className="workout-player__icon" />
                </Button>

                {playPauseButton}

                <Button handleClick={this.resetTimer}>
                    <IconReset className="workout-player__icon" />
                </Button>

                <Button handleClick={this.handleNextInterval}>
                    <IconNext className="workout-player__icon" />
                </Button>
            </div>
        );

        return (
            <div className="workout-player" style={style}>
                {this.props.workout ? (
                    <>
                        {workoutFinished}
                        {currentIntervalTimer}
                        {workoutControls}
                    </>
                ) : (
                    <div className="workout-player__fallback">Oops! Workout doesn't exist...</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any, params: any) => ({
    workout: currentWorkout(state, params.match.params.workoutId),
});

export default withRouter(connect(mapStateToProps)(WorkoutPlayer));
