import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import workouts from '@/store/slices/workouts';
import { saveState } from '@/utils/localStorage';

export const store = configureStore({
    reducer: {
        workouts,
    },
});

store.subscribe(() => {
    saveState({
        ...store.getState().workouts,
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
