import React from 'react';
import '@testing-library/jest-dom';

import { render, cleanup } from '../../test-utils';

import WorkoutsList from '@/components/workoutsList/WorkoutsList';
import { mockStoreWorkoutData } from '@/components/workoutEditor/mockData';
import { workoutsAsArray } from '@/store/slices/workouts';

describe('workouts list', () => {
    afterEach(cleanup);

    test('should render all swipe list elements', () => {
        const element = <WorkoutsList />;
        const renderedElement = render(element, {
            initialState: { workouts: mockStoreWorkoutData },
        });

        const swipeListElements = renderedElement.getAllByTestId(/swipeListElement/);
        const workouts = workoutsAsArray({ workouts: mockStoreWorkoutData });
        expect(swipeListElements).toHaveLength(workouts.length);
    });

    test('should show message when no workouts found', () => {
        const element = <WorkoutsList />;
        const { getByText } = render(element, {
            initialState: { workouts: {} },
        });
        expect(getByText('No workouts found')).toBeInTheDocument();
    });
});
