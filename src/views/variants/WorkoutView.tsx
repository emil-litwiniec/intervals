import React from 'react';
import StartWorkout from '@/components/startWorkout/StartWorkout';
import WorkoutsList from '@/components/workoutsList/WorkoutsList';
import View from '../View';

const WorkoutView: React.FC = () => {
    return (
        <View variant="workout">
            <StartWorkout />
            <WorkoutsList />
        </View>
    );
};

export default WorkoutView;
