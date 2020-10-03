import { EditorElementProps } from "./WorkoutEditorElement";
import { v4 as uuidv4 } from 'uuid';
import { Interval } from "@/store/slices/workouts";

export type EditorElementFromState = Omit<
    EditorElementProps,
    | 'onDurationChange'
    | 'onPositionChange'
    | 'onPositionUpdate'
    | 'onColorChange'
    | 'updateOffsetTop'
    | 'onDelete'
    | 'onTextInputUpdate'
>;

export default class EditorElement implements EditorElementFromState {
    id = uuidv4();
    mainTitle = 'Empty Interval';
    subsectionTitles: string[] = [];
    color = 'coral';
    duration = 30;
    offsetTop = 0;
    height = 0;
    swapIndex = -1;
    swapHighlight = false;

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