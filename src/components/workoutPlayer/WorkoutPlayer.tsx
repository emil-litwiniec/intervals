import React, { Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import Timer, { ChildCallables } from '@/components/timer/Timer';
import Button from '@/components/button/Button';

import { IconPlay, IconPause, IconReset, IconNext, IconPrev } from '@/misc/icons';
import './_workoutPlayer.scss';
import { currentWorkout, WorkoutData, Interval } from '@/store/slices/workouts';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ToggleSoundButton from '../button/ToggleSoundButton';
import { isMuttedSelector } from '@/store/slices/settings';

type WorkoutPlayerState = {
    isTimerOn: boolean;
    hasWorkoutFinished: boolean;
    currentStepIndex: number;
    currentSetIteration: number;
    totalStepIndex: number;
    windowWidth: number;
};

type WorkoutPlayerProps = RouteComponentProps & {
    workout: WorkoutData | null;
    isMutted: boolean;
};

class WorkoutPlayer extends Component<WorkoutPlayerProps, WorkoutPlayerState> {
    intervalTimerCallables: ChildCallables | null = null;
    totalTimerCallables: ChildCallables | null = null;
    routeChangeTimeout: NodeJS.Timeout | null = null;

    constructor(props: WorkoutPlayerProps) {
        super(props);
        this.state = {
            isTimerOn: false,
            currentStepIndex: 0,
            totalStepIndex: 0,
            currentSetIteration: 1,
            hasWorkoutFinished: false,
            windowWidth: window.innerWidth,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate(prevProps: WorkoutPlayerProps, prevState: WorkoutPlayerState) {
        const hasStepIndexChanged = prevState.currentStepIndex !== this.state.currentStepIndex;
        if (hasStepIndexChanged) {
            const isOverLastStepIndex = this.state.currentStepIndex > this.lastStepIndex;
            this.setState({ hasWorkoutFinished: isOverLastStepIndex });
            if (isOverLastStepIndex) {
                this.routeChangeTimeout = setTimeout(() => this.props.history.push('/'), 5000);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        if (this.routeChangeTimeout) {
            clearTimeout(this.routeChangeTimeout);
        }
    }

    handleResize = () => {
        this.setState({ windowWidth: window.innerWidth });
    };

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
        if (this.state.hasWorkoutFinished) return;
        this.totalTimerCallables?.setMillisecondsLeft(this.totalTimeLeftFromStep);
    };

    handleNextInterval = () => {
        this.setState((state) => {
            const shouldStartNewSet =
                this.lastStepIndex === state.currentStepIndex &&
                state.currentSetIteration < (this.props.workout?.setIterations || 1);

            const newStepIndex = shouldStartNewSet ? 1 : state.currentStepIndex + 1;
            const newSetIteration = shouldStartNewSet
                ? state.currentSetIteration + 1
                : state.currentSetIteration;

            return {
                currentStepIndex: newStepIndex,
                currentSetIteration: newSetIteration,
                totalStepIndex: state.totalStepIndex + 1,
            };
        }, this.updateTotalTimer);
    };

    handlePreviousInterval = () => {
        if (this.state.currentStepIndex === 0) return;
        this.setState((state) => {
            const shouldSetPreviousSet =
                this.state.currentStepIndex === 1 && this.state.currentSetIteration > 1;

            const newStepIndex = shouldSetPreviousSet
                ? this.lastStepIndex
                : state.currentStepIndex - 1;

            const newSetIteration = shouldSetPreviousSet
                ? state.currentSetIteration - 1
                : state.currentSetIteration;

            return {
                currentStepIndex: newStepIndex,
                currentSetIteration: newSetIteration,
                totalStepIndex: state.totalStepIndex - 1,
            };
        }, this.updateTotalTimer);
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
        const maxSetIterations = this.props.workout?.setIterations || 1;
        let stepIteration = this.state.currentSetIteration;

        for (let i = this.state.totalStepIndex; i <= this.lastStepIndex * maxSetIterations; i++) {
            const patternIndex = i - (stepIteration - 1) * this.lastStepIndex;
            const intervalDuration = this.getInterval(patternIndex)?.duration || 0;

            totalTimeLeft += intervalDuration;
            i === this.lastStepIndex * stepIteration && stepIteration++;
        }
        return totalTimeLeft;
    }

    get lastStepIndex() {
        const workout = this.props.workout;
        if (!workout) return 0;
        const { coreIterations, pattern } = workout;
        return pattern.length * coreIterations + 1;
    }

    get currentCoreIteration(): number {
        const stepIndex = this.state.currentStepIndex;
        const workout = this.props.workout;
        if (!workout) return 1;
        const { pattern } = workout;
        const iteration = Math.floor(stepIndex / pattern.length);
        return iteration;
    }

    render() {
        const currentInterval = this.getInterval(this.state.currentStepIndex);
        const { windowWidth } = this.state;
        const isSmallDevice = windowWidth < 352;
        const style: CSSProperties = {
            backgroundColor: currentInterval ? currentInterval.color : 'red',
        };
        const hiddenPreviousButtonClass = this.state.currentStepIndex === 0 ? 'hidden' : '';

        const intervalNamesGroup = currentInterval && (
            <div className="workout-player__title-group">
                <span className="workout-player__subsection-title">
                    {currentInterval.subsectionTitles &&
                        currentInterval.subsectionTitles[this.currentCoreIteration]}
                </span>
                <span className="workout-player__interval-title">{currentInterval!.mainTitle}</span>
            </div>
        );

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
                <div className="workout-player__timer-container">
                    <div className="workout-player__info-top">
                        <span className="workout-player__step-counter">
                            {`${this.state.currentSetIteration} / ${this.props.workout?.setIterations}`}
                        </span>
                        <ToggleSoundButton className="workout-player__toggle-sound" />
                    </div>
                    <span className="workout-player__workout-title">
                        {this.props.workout?.title}
                    </span>
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
                    {isSmallDevice && intervalNamesGroup}
                </div>
                <div className="workout-player__info">
                    {totalWorkoutTimer}
                    {!isSmallDevice && intervalNamesGroup}
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
    isMutted: isMuttedSelector(state),
});

export default withRouter(connect(mapStateToProps)(WorkoutPlayer));
