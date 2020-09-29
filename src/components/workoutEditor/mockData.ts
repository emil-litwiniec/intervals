import { v4 as uuidv4 } from 'uuid';

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


// const mockWorkoutData = {
//     title: 'SomeTitle',
//     totalDuration: 4500,
//     repeat: 1,
//     pattern: [
//         {
//             mainTitle: "High Interval",
//             subSectionTitles: [
//                 'Push-ups', 'Sit-ups'
//             ],
//             duration: 30,
//             color: '#f3f3f3'
//         },
//         {
//             mainTitle: "Rest",
//             subSectionTitles: [
//             ],
//             duration: 30,
//             color: 'red'
//         }
//     ],
//     startInterval: {
//         mainTitle: "Warm up",
//         duration: 30,
//         color: '#f3f3f3'
//     },
//     endInterval: {
//         mainTitle: "Cool down",
//         duration: 30,
//         color: '#f3f3f3'
//     },
// }