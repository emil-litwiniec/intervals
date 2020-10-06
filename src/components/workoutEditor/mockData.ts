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
        title: 'Funk!',
        totalDuration: 4500,
        coreIterations: 10,
        setIterations: 2,
        pattern: [
            {
                id: 'xasda',
                mainTitle: 'High Interval Cool',
                subsectionTitles: [
                    'Seal Jacks',
                    'Push Ups',
                    'Forward Lunges (Alternating)',
                    'Abs Hip Raises',
                    'Jumping Jacks',
                    'Superman',
                    'Mountain Climbers',
                    'Close Squats',
                    'Planks',
                    'Burpees',
                ],
                duration: 30,
                color: '#6CB4EE',
            },
            {
                id: 'sdawqq',
                mainTitle: 'Rest',
                subsectionTitles: [],
                duration: 30,
                color: '#6495ED',
            },
        ],
        startInterval: {
            id: 'poqiwe',
            mainTitle: 'Warm up',
            duration: 2 * 60,
            color: '#5F9EA0',
        },
        endInterval: {
            id: 'aposuipiojp',
            mainTitle: 'Cool down',
            duration: 60,
            color: '#0a2351',
        },
    },
    pg423: {
        id: 'pg423',
        title: 'SomeTitle',
        totalDuration: 4500,
        coreIterations: 2,
        setIterations: 3,
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
