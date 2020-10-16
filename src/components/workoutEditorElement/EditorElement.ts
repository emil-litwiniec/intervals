import { v4 as uuidv4 } from 'uuid';
import { Interval } from '@/store/slices/workouts';

export enum BorderVariant {
    TOP = 'selection-border selection-top',
    BOTTOM = 'selection-border selection-bottom',
    SIDES = 'selection-border selection-sides',
    ALL = 'selection-border selection-all',
    NONE = 'selection-none',
}

export const availableColors = [
    '#138d75',
    '#229954',
    '#5F9EA0',
    '#6CB4EE',
    '#6495ED',
    '#2e86c1',
    '#1a5276',
    '#0a2351',
    '#943126',
    '#7b241c',
    '#9c27b0',
    '#ff5722',
    '#ffa000',
    '#f57c00',
    '#e72837',
    '#e91e63',
    '#fb5858',
    'coral',
];

const getRandomInt = (min: number = 0, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

class RandomColor {
    private previousColor: string | null = null;
    private static instance: RandomColor;

    public getColor = (): string => {
        const index = availableColors.findIndex((el) => el === this.previousColor);
        const sourceArr = [...availableColors];

        index !== -1 && sourceArr.splice(index, 1);
        const randomIndex = getRandomInt(0, sourceArr.length);
        const newColor = sourceArr[randomIndex];
        this.previousColor = newColor;
        return newColor;
    };

    static getInstance(): RandomColor {
        if (!RandomColor.instance) {
            RandomColor.instance = new RandomColor();
        }

        return RandomColor.instance;
    }
}

export default class EditorElement {
    id: string;
    mainTitle: string;
    subsectionTitles: string[];
    color: string;
    duration: number;
    offsetTop = 0;
    height = 0;
    swapIndex = -1;
    swapHighlight = false;
    borderVariant = BorderVariant.NONE;

    constructor(intervalData: Partial<Interval> = {}) {
        const {
            id = uuidv4(),
            mainTitle = 'Empty Interval',
            subsectionTitles = [],
            duration = 60,
            color = RandomColor.getInstance().getColor(),
        } = intervalData;
        this.id = id;
        this.mainTitle = mainTitle;
        this.subsectionTitles = subsectionTitles || [];
        this.duration = duration;
        this.color = color;
    }
}
