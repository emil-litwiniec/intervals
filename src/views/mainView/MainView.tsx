import React from 'react';
import StartWorkout from '@/components/startWorkout/StartWorkout';
import WorkoutsList from "@/components/workoutsList/WorkoutsList";

type Props = {};

const MainView: React.FC<Props> = () => {
    return (
        <div className="">
            <StartWorkout />
            <WorkoutsList/>
        </div>
    );
};

export default MainView;
