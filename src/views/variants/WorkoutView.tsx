import React from 'react';
import WorkoutPlayer from '@/components/workoutPlayer/WorkoutPlayer';
import View from '../View';

const WorkoutView: React.FC = () => {
    return (
        <View variant="workout">
            <WorkoutPlayer />
        </View>
    );
};

export default WorkoutView;
