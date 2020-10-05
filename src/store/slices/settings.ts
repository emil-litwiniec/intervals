import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { loadState } from '@/utils/localStorage';

export const settingsSlice: Slice = createSlice({
    name: 'settings',
    initialState: loadState().settings || { mute: false },
    reducers: {
        setMute(state, { payload }: PayloadAction<boolean>) {
            state.mute = payload;
        },
    },
});

export const { setMute } = settingsSlice.actions;

export const isMuttedSelector = (state: { settings: { mute: boolean } }) => {
    return state.settings.mute;
};

export default settingsSlice.reducer;
