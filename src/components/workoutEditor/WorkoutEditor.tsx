import React, { createRef, RefObject } from 'react';
import { Button } from '../button';
import WorkoutEditorElement, {
    EditorElementProps,
} from '@/components/workoutEditorElement/WorkoutEditorElement';
import { v4 as uuidv4 } from 'uuid';
import { mockEditorElements } from './mockData';

interface State {
    editorElements: EditorElementFromState[];
}

type EditorElementFromState = Omit<
    EditorElementProps,
    | 'onDurationChange'
    | 'onPositionChange'
    | 'onPositionUpdate'
    | 'onColorChange'
    | 'updateOffsetTop'
>;

interface Props {}

class WorkoutEditor extends React.Component<Props, State> {
    state: State;

    references: RefObject<WorkoutEditorElement>[] = [];

    constructor(props: Props) {
        super(props);
        this.state = {
            editorElements: [...mockEditorElements],
        };
    }

    get editorElements() {
        return this.state.editorElements.map((element) => {
            const newRef: RefObject<WorkoutEditorElement> = createRef();
            this.references.push(newRef);

            return (
                <WorkoutEditorElement
                    key={element.id}
                    onDurationChange={this.onDurationChange}
                    onPositionChange={this.onPositionChange}
                    onPositionUpdate={this.onPositionUpdate}
                    onColorChange={this.onColorChange}
                    updateOffsetTop={this.updateOffsetTop}
                    ref={newRef}
                    {...element}
                />
            );
        });
    }

    updateAllReferences = () => {
        this.references.forEach((ref) => {
            ref.current?.updateOffset();
        });
    };

    onDurationChange = (id: string, diff: number) => {
        this.udpateEditorElementsState((element) => {
            if (element.id === id) {
                element.height = element.height + diff;
            }
        });

        this.updateAllReferences();
    };

    onPositionChange = (id: string, clientY: number) => {
        this.state.editorElements.forEach((element, elementIndex) => {
            if (element.id === id) return;
            const threshold = 15; // in pixels
            const shouldSwap =
                clientY > element.offsetTop - threshold && clientY < element.offsetTop + threshold;
            const shouldSwapLastElement =
                clientY > element.offsetTop + element.height - threshold &&
                clientY < element.offsetTop + element.height + threshold;

            if (shouldSwap) {
                this.udpateEditorElementsState((el, index) => {
                    if (index === elementIndex) {
                        el.swapHighlight = true;
                    }
                    if (el.id === id) {
                        el.swapIndex = elementIndex;
                    }
                });
            } else if (shouldSwapLastElement) {
                this.udpateEditorElementsState((el) => {
                    if (el.id === id) {
                        el.swapIndex = elementIndex + 1;
                    }
                });
            } else {
                this.udpateEditorElementsState((el, index) => {
                    if (index === elementIndex) {
                        el.swapHighlight = false;
                    }
                });
            }
        });
    };

    udpateEditorElementsState = (
        callback: (
            value: EditorElementFromState,
            index: number,
            array: EditorElementFromState[]
        ) => void
    ) => {
        this.setState((state) => {
            const newEditorElements = [...state.editorElements];
            newEditorElements.forEach(callback);
            return {
                ...state,
                editorElements: newEditorElements,
            };
        });
    };

    onColorChange = (id: string) => {
        console.log('onColorChange()');
    };

    updateOffsetTop = (id: string, offsetTop: number) => {
        this.udpateEditorElementsState((element) => {
            if (element.id === id) {
                element.offsetTop = offsetTop;
            }
        });
    };

    onPositionUpdate = (id: string, swapIndex: number) => {
        this.setState((state) => {
            const newEditorElements = [...state.editorElements];
            const newElementIndex = newEditorElements.findIndex((el) => el.id === id);
            newEditorElements[swapIndex].swapHighlight = false;
            const tempElement = newEditorElements.splice(newElementIndex, 1);
            tempElement[0].swapIndex = -1;

            newEditorElements.splice(swapIndex, 0, tempElement[0]);

            return {
                ...state,
                editorElements: newEditorElements,
            };
        });

        this.updateAllReferences();
    };

    addEmptyElement = () => {
        this.setState((state) => {
            const newElement: EditorElementProps = {
                duration: 30,
                name: 'Empty Interval',
                color: 'cornflowerblue',
                height: 30,
                id: uuidv4(),
                swapIndex: -1,
                swapHighlight: false,
                offsetTop: 0,
                onDurationChange: this.onDurationChange,
                onPositionChange: this.onPositionChange,
                onPositionUpdate: this.onPositionUpdate,
                onColorChange: this.onColorChange,
                updateOffsetTop: this.updateOffsetTop,
            };
            return {
                ...state,
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
