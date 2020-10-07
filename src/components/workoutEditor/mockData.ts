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
        totalDuration: 1440,
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
            subsectionTitles: [],
            duration: 120,
            color: '#5F9EA0',
        },
        endInterval: {
            id: 'aposuipiojp',
            mainTitle: 'Cool down',
            subsectionTitles: [],
            duration: 60,
            color: '#0a2351',
        },
    },
    pg423: {
        id: 'pg423',
        title: 'My Workout',
        totalDuration: 930,
        coreIterations: 2,
        setIterations: 3,
        pattern: [
            {
                id: 'xasda',
                mainTitle: 'High Interval',
                subsectionTitles: ['Push-ups', 'Sit-ups'],
                duration: 120,
                color: '#009688',
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
            subsectionTitles: [],
            duration: 30,
            color: '#673ab7',
        },
        endInterval: {
            id: 'aposuipiojp',
            mainTitle: 'Cool down',
            subsectionTitles: [],
            duration: 30,
            color: '#3f51b5',
        },
    },
};
