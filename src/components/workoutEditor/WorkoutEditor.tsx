import React from 'react';
import { Button } from '../button';
import WorkoutEditorElement, {
    EditorElementProps,
} from '@/components/workoutEditorElement/WorkoutEditorElement';
import { v4 as uuidv4 } from 'uuid';

interface State {
    editorElements: EditorElementProps[];
}

interface Props {}

class WorkoutEditor extends React.Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            editorElements: [
                {
                    duration: 30,
                    name: 'Empty Interval',
                    color: 'coral',
                    height: 30,
                    id: uuidv4(),
                    onDurationChange: this.onDurationChange,
                    onPositionChange: this.onPositionChange,
                    onColorChange: this.onColorChange,
                },
                {
                    duration: 30,
                    name: 'Empty Interval',
                    color: 'seagreen',
                    height: 55,
                    id: uuidv4(),
                    onDurationChange: this.onDurationChange,
                    onPositionChange: this.onPositionChange,
                    onColorChange: this.onColorChange,
                },
            ],
        };
    }

    get editorElements() {
        return this.state.editorElements.map((element, index) => (
            <WorkoutEditorElement key={index} {...element} />
        ));
    }

    onDurationChange = (id: string, diff: number) => {
        this.setState((state) => {
            const newEditorElements = [...state.editorElements];
            newEditorElements.forEach((element) => {
                if (element.id === id) {
                    element.height = element.height + diff;
                }
            });
            return {
                editorElements: newEditorElements,
            };
        });
    };

    onPositionChange = (id: string, diff: number) => {
        console.log('onPositionChange()');
    };

    onColorChange = (id: string) => {
        console.log('onColorChange()');
    };

    addEmptyElement = () => {
        this.setState((state) => {
            const newElement = {
                duration: 30,
                name: 'Empty Interval',
                color: 'cornflowerblue',
                height: 30,
                id: uuidv4(),
                onDurationChange: this.onDurationChange,
                onPositionChange: this.onPositionChange,
                onColorChange: this.onColorChange,
            };
            return {
                editorElements: [...state.editorElements, newElement],
            };
        });
    };

    render() {
        return (
            <section>
                {this.editorElements}
                <Button handleClick={this.addEmptyElement}>Add element</Button>
            </section>
        );
    }
}

export default WorkoutEditor;
