import { v4 as uuidv4 } from 'uuid';
import { Interval } from '@/store/slices/workouts';

export enum BorderVariant {
    TOP = 'selection-border selection-top',
    BOTTOM = 'selection-border selection-bottom',
    SIDES = 'selection-border selection-sides',
    ALL = 'selection-border selection-all',
    NONE = 'selection-none',
}

export default class EditorElement {
    id = uuidv4();
    mainTitle = 'Empty Interval';
    subsectionTitles: string[] = [];
    color = 'coral';
    duration = 60;
    offsetTop = 0;
    height = 0;
    swapIndex = -1;
    swapHighlight = false;
    borderVariant = BorderVariant.NONE;

    constructor(intervalData?: Interval) {
        if (intervalData) {
            const { id, mainTitle, subsectionTitles, duration, color } = intervalData;
            this.id = id;
            this.mainTitle = mainTitle;
            this.subsectionTitles = subsectionTitles || [];
            this.duration = duration;
            this.color = color;
        }
    }
}
