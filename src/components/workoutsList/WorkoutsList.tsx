import React from 'react';
import { useSelector } from 'react-redux';
import WorkoutListElement from '@/components/workoutListElement/WorkoutListElement';
import './_workoutsList.scss';
import { WorkoutData, workoutsAsArray, WorkoutsState } from '@/store/slices/workouts';

const WorkoutsList: React.FC = () => {
    const workouts: any = useSelector<{ workouts: WorkoutsState }>(workoutsAsArray);

    const workoutsList = workouts.map((workout: WorkoutData) => (
        <WorkoutListElement
            workoutId={workout.id}
            workoutName={workout.title}
            workoutDuration={workout.totalDuration}
            key={workout.id}
        />
    ));
    return (
        <section className="workouts-list">
            {workoutsList.length > 0 ? (
                workoutsList
            ) : (
                <div className="workouts-list__no-workouts">No workouts found</div>
            )}
        </section>
    );
};

export default WorkoutsList;
