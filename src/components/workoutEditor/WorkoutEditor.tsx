import React, { createRef, RefObject } from 'react';
import { Button } from '../button';
import WorkoutEditorElement, {
    EditorElementProps,
} from '@/components/workoutEditorElement/WorkoutEditorElement';
import { v4 as uuidv4 } from 'uuid';
import { mockEditorElements } from './mockData';
import './_workoutEditor.scss';
import { ColorResult } from 'react-color';
import TextInput from '../textInput/TextInput';
import { Link } from 'react-router-dom';
import { IconPlay } from '@/misc/icons';

interface State {
    editorElements: EditorElementFromState[];
    workoutName: string;
    workoutId: string;
}

type EditorElementFromState = Omit<
    EditorElementProps,
    | 'onDurationChange'
    | 'onPositionChange'
    | 'onPositionUpdate'
    | 'onColorChange'
    | 'updateOffsetTop'
    | 'onDelete'
    | 'onTextInputUpdate'
>;

interface Props {}

class WorkoutEditor extends React.Component<Props, State> {
    state: State;

    references: RefObject<WorkoutEditorElement>[] = [];

    constructor(props: Props) {
        super(props);
        this.state = {
            editorElements: [...mockEditorElements],
            workoutName: 'New Workout',
            workoutId: uuidv4(),
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
                    onDelete={this.onDelete}
                    updateOffsetTop={this.updateOffsetTop}
                    onTextInputUpdate={this.onTextInputUpdate}
                    ref={newRef}
                    {...element}
                />
            );
        });
    }

    componentDidMount() {
        this.calculateProportions();
    }

    calculateProportions = () => {
        const durationSum = this.state.editorElements.reduce((acc, curr): any => {
            return { duration: acc.duration + curr.duration };
        }).duration;

        const calcPercentage = (duration: number): number => {
            return 100 / (durationSum / duration);
        };

        this.setState((state) => ({
            ...state,
            editorElements: state.editorElements.map((el) => ({
                ...el,
                height: calcPercentage(el.duration),
            })),
        }));
    };

    updateAllReferences = () => {
        this.references.forEach((ref) => {
            ref.current?.updateOffset();
        });
    };

    onDurationChange = (id: string, diff: number) => {
        this.udpateEditorElementsState(
            (element) => {
                if (element.id === id) {
                    element.duration = element.duration + diff;
                }
            },
            () => {
                this.calculateProportions();
                this.updateAllReferences();
            }
        );
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
        ) => void,
        afterSetStateCallback?: () => void
    ) => {
        this.setState(
            (state) => {
                const newEditorElements = [...state.editorElements];
                newEditorElements.forEach(callback);
                return {
                    ...state,
                    editorElements: newEditorElements,
                };
            },
            () => {
                if (afterSetStateCallback) afterSetStateCallback();
            }
        );
    };

    onColorChange = (id: string, color: ColorResult) => {
        this.udpateEditorElementsState((element) => {
            if (element.id === id) {
                element.color = color.hex;
            }
        });
    };

    onDelete = (id: string) => {
        const referenceIndex = this.references.findIndex((el) => el.current?.props.id === id);
        this.references.splice(referenceIndex, 1);
        this.setState((state) => {
            const newEditorElements = [...state.editorElements];
            const elementIndex = newEditorElements.findIndex((el) => el.id === id);
            newEditorElements.splice(elementIndex, 1);

            return {
                ...state,
                editorElements: newEditorElements,
            };
        }, this.calculateProportions);
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
        }, this.updateAllReferences);
    };

    addEmptyElement = () => {
        this.setState((state) => {
            const newElement: EditorElementFromState = {
                duration: 30,
                name: 'Empty Interval',
                color: 'cornflowerblue',
                height: 30,
                id: uuidv4(),
                swapIndex: -1,
                swapHighlight: false,
                offsetTop: 0,
            };
            return {
                ...state,
                editorElements: [...state.editorElements, newElement],
            };
        }, this.calculateProportions);
    };

    onTextInputUpdate = (id: string, value: string) => {
        this.udpateEditorElementsState((el) => {
            if (el.id === id) {
                el.name = value;
            }
        });
    };

    onWorkoutNameUpdate = (value: string) => {
        this.setState((state) => ({
            ...state,
            workoutName: value,
        }));
    };

    render() {
        return (
            <section className="workout-editor">
                <div className="workout-editor__elements">{this.editorElements}</div>
                <div className="workout-editor__button-wrapper">
                    <Button handleClick={this.addEmptyElement}>
                        <div>Add interval</div>
                    </Button>
                    <TextInput
                        value={this.state.workoutName}
                        onTextInputUpdate={this.onWorkoutNameUpdate}
                        label="Workout Title: "
                        classNameVariant="editor-element"
                    />
                    <Link
                        className="workout-editor__play-btn"
                        to={{ pathname: `workout/${this.state.workoutId}` }}
                    >
                        <IconPlay />
                    </Link>
                </div>
            </section>
        );
    }
}

export default WorkoutEditor;
