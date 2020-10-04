import { v4 as uuidv4 } from 'uuid';
import { WorkoutsState } from '@/store/slices/workouts';
import EditorElement from '@/components/workoutEditorElement/EditorElement';

export const mockEditorElements: EditorElement[] = [
    new EditorElement(),
    new EditorElement(),
    new EditorElement(),
    new EditorElement(),
];

export const mockStoreWorkoutData: WorkoutsState = {
    xs34: {
        id: 'xs34',
        title: 'SomeTitle',
        totalDuration: 4500,
        iterations: 3,
        pattern: [
            {
                id: 'xasda',
                mainTitle: 'High Interval Cool',
                subsectionTitles: ['Push-ups', 'Sit-ups'],
                duration: 120,
                color: 'coral',
            },
            {
                id: 'sdawqq',
                mainTitle: 'Rest',
                subsectionTitles: [],
                duration: 16,
                color: 'red',
            },
        ],
        startInterval: {
            id: 'poqiwe',
            mainTitle: 'Warm up',
            duration: 30,
            color: 'green',
        },
        endInterval: {
            id: 'aposuipiojp',
            mainTitle: 'Cool down',
            duration: 30,
            color: 'black',
        },
    },
    pg423: {
        id: 'pg423',
        title: 'SomeTitle',
        totalDuration: 4500,
        iterations: 1,
        pattern: [
            {
                id: 'xasda',
                mainTitle: 'High Interval',
                subsectionTitles: ['Push-ups', 'Sit-ups'],
                duration: 120,
                color: '#f3f3f3',
            },
            {
                id: 'sdawqq',
                mainTitle: 'Rest',
                subsectionTitles: [],
                duration: 15,
                color: 'red',
            },
        ],
        startInterval: {
            id: 'poqiwe',
            mainTitle: 'Warm up',
            duration: 30,
            color: '#f3f3f3',
        },
        endInterval: {
            id: 'aposuipiojp',
            mainTitle: 'Cool down',
            duration: 30,
            color: '#f3f3f3',
        },
    },
};
