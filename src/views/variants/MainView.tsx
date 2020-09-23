import React from 'react';
import StartWorkout from '@/components/startWorkout/StartWorkout';
import WorkoutsList from '@/components/workoutsList/WorkoutsList';
import View from '../View';

const MainView: React.FC = () => {
    return (
        <View variant="main">
            <StartWorkout />
            <WorkoutsList />
        </View>
    );
};

export default MainView;
