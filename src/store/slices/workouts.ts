import { createSlice, Slice } from '@reduxjs/toolkit';
import { mockStoreWorkoutData } from '@/components/workoutEditor/mockData';

export type Interval = {
    id: string;
    mainTitle: string;
    duration: number;
    color: string;
};

type SubsectionInterval = Interval & {
    subsectionTitles: string[];
};

export type WorkoutData = {
    title: string;
    totalDuration: number;
    iterations: number;
    pattern: SubsectionInterval[];
    startInterval: Interval;
    endInterval: Interval;
};

export type WorkoutsState = {
    [key: string]: WorkoutData;
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

export const currentWorkout = (state: { workouts: WorkoutsState }, id: string) => {
    return state.workouts[id] || null;
};

export default workoutsSlice.reducer;
