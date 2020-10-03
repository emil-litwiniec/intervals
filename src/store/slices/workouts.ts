import { createSlice, Slice } from '@reduxjs/toolkit';
import { mockStoreWorkoutData } from '@/components/workoutEditor/mockData';

export type Interval = {
    id: string;
    mainTitle: string;
    duration: number;
    color: string;
    subsectionTitles?: string[];
};

export type WorkoutData = {
    id?: string;
    title: string;
    totalDuration: number;
    iterations: number;
    pattern: Interval[];
    startInterval: Interval;
    endInterval: Interval;
};

export type WorkoutsState = {
    [key: string]: WorkoutData;
};

export type SingleWorkoutEntry = {
    0: string;
    1: WorkoutData;
};

const workoutsSlice: Slice<WorkoutsState> = createSlice({
    name: 'workouts',
    initialState: mockStoreWorkoutData as WorkoutsState,
    reducers: {
        saveWorkout() {},
        replaceWorkout() {},
        deleteWorkout() {},
        deleteAllWorkouts() {},
    },
});

export const currentWorkout = (
    state: { workouts: WorkoutsState },
    id: string
) => {
    const workout = state.workouts[id];
    if (workout) {
        workout.id = id;
    }
    return workout || null;
};

export const workoutsAsArray = (state: { workouts: WorkoutsState }) => {
    return Object.entries(state.workouts).map((el) => ({ id: el[0], ...el[1] }));
};

export default workoutsSlice.reducer;
