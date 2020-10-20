import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, cleanup } from '../../test-utils';

import WorkoutEditor from '@/components/workoutEditor/WorkoutEditor';
import { mockEditorElements } from '@/components/workoutEditor/mockData';
const history = createMemoryHistory();

describe('workout editor', () => {
    let renderedElement;
    beforeEach(() => {
        const element = (
            <Router history={history}>
                <WorkoutEditor workout={mockEditorElements} />
            </Router>
        );
        renderedElement = render(element, { initialState: { workouts: {} } });
    });
    afterEach(cleanup);

    test('should render all editor elements', () => {
        const editorElements = renderedElement.getAllByTestId(/workoutEditorElement/);
        expect(editorElements).toHaveLength(mockEditorElements.length);
    });
});
