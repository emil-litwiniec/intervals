import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { mockStoreWorkoutData } from '@/components/workoutEditor/mockData';
import { loadState } from '@/utils/localStorage';

export type Interval = {
    id: string;
    mainTitle: string;
    duration: number;
    color: string;
    subsectionTitles?: string[];
};

export type WorkoutData = {
    id: string;
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

export const workoutsSlice: Slice = createSlice({
    name: 'workouts',
    initialState: loadState().workout || mockStoreWorkoutData,
    reducers: {
        saveWorkout(state, { payload }: PayloadAction<WorkoutData>) {
            state[payload.id] = payload;
        },
        deleteWorkout(state, { payload }: PayloadAction<string>) {
            delete state[payload];
        },
        deleteAllWorkouts() {
            return {};
        },
    },
});

export const { saveWorkout, deleteWorkout, deleteAllWorkouts } = workoutsSlice.actions;

export const currentWorkout = (state: { workouts: WorkoutsState }, id: string) => {
    const workout = state.workouts[id];
    return workout || null;
};

export const workoutsAsArray = (state: { workouts: WorkoutsState }) => {
    return Object.entries(state.workouts).map((el) => el[1]);
};

export default workoutsSlice.reducer;
