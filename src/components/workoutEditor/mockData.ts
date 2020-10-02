import { v4 as uuidv4 } from 'uuid';
import { WorkoutsState } from '@/store/slices/workouts';

export const mockEditorElements = [
    {
        duration: 30,
        name: 'Empty Interval',
        color: 'coral',
        height: 75,
        id: uuidv4(),
        offsetTop: 0,
        index: 0,
        swapIndex: -1,
        swapHighlight: false,
    },
    {
        duration: 30,
        name: 'Empty Interval',
        color: 'seagreen',
        height: 75,
        id: uuidv4(),
        offsetTop: 0,
        swapIndex: -1,
        index: 1,
        swapHighlight: false,
    },
    {
        duration: 30,
        name: 'Empty Interval',
        color: 'red',
        height: 75,
        id: uuidv4(),
        offsetTop: 0,
        swapIndex: -1,
        index: 2,
        swapHighlight: false,
    },
    {
        duration: 30,
        name: 'Empty Interval',
        color: 'blue',
        height: 30,
        id: uuidv4(),
        offsetTop: 0,
        swapIndex: -1,
        index: 3,
        swapHighlight: false,
    },
];

export const mockStoreWorkoutData: WorkoutsState = {
    xs34: {
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
