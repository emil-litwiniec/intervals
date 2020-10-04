import { WorkoutsState } from '@/store/slices/workouts';

const localStorageKey = 'workoutsData';

export const loadState = (): WorkoutsState | null => {
    try {
        const json = localStorage.getItem(localStorageKey);
        if (!json) return null;
        return JSON.parse(json);
    } catch (err) {
        return null;
    }
};

export const saveState = (state: { workouts: WorkoutsState }) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
};
