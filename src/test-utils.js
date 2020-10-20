import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';

const renderWithStore = (
    ui,
    {
        initialState = { workouts: {} },
        reducer = (state) => {
            return state;
        },
        store = createStore(reducer, initialState),
        ...renderOptions
    }
) => {
    const MockStoreProvider = ({ children }) => {
        return <Provider store={store}>{children}</Provider>;
    };
    return render(ui, { wrapper: MockStoreProvider, ...renderOptions });
};

export * from '@testing-library/react';

export { renderWithStore as render };
