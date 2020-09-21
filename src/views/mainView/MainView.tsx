import React from 'react';
import StartWorkout from '@/components/startWorkout/StartWorkout';
import WorkoutsList from '@/components/workoutsList/WorkoutsList';
import './_mainView.scss';

type Props = {};

const MainView: React.FC<Props> = () => {
    return (
        <div className="main-view__container">
            <StartWorkout />
            <WorkoutsList />
        </div>
    );
};

export default MainView;
