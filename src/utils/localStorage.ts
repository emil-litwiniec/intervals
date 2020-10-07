const localStorageKey = 'workoutsData';

export const loadState = (): any | null => {
    try {
        const json = localStorage.getItem(localStorageKey);
        if (!json) return {};
        return JSON.parse(json);
    } catch (err) {
        return {};
    }
};

export const saveState = (state: any) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, serializedState);
};
