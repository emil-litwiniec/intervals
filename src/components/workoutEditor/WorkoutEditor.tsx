import React, { createRef, RefObject } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { currentWorkout, WorkoutData } from '@/store/slices/workouts';

import { Button } from '../button';
import WorkoutEditorElement from '@/components/workoutEditorElement/WorkoutEditorElement';
import TextInput from '../textInput/TextInput';
import { mockEditorElements } from './mockData';
import { ColorResult } from 'react-color';
import { Link } from 'react-router-dom';
import { IconPlay } from '@/misc/icons';
import EditorElement, {
    EditorElementFromState,
} from '@/components/workoutEditorElement/EditorElement';

import './_workoutEditor.scss';

type WorkoutEditorState = {
    editorElements: EditorElementFromState[];
    workoutName: string;
    workoutId: string;
};

type WorkoutEditorProps = RouteComponentProps & {
    workout: WorkoutData | null;
};

const mapStateToEditorElements = ({
    startInterval,
    pattern,
    endInterval,
}: WorkoutData): EditorElementFromState[] => {
    return [
        new EditorElement(startInterval),
        ...pattern.map((interval) => new EditorElement(interval)),
        new EditorElement(endInterval),
    ];
};

class WorkoutEditor extends React.Component<WorkoutEditorProps, WorkoutEditorState> {
    state: WorkoutEditorState;

    references: RefObject<WorkoutEditorElement>[] = [];

    constructor(props: WorkoutEditorProps) {
        super(props);
        this.state = {
            editorElements: props.workout
                ? mapStateToEditorElements(props.workout)
                : [...mockEditorElements],
            workoutName: props.workout ? props.workout.title : 'New Workout',
            workoutId: props.workout ? props.workout.id || uuidv4() : uuidv4(),
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
                editorElements: newEditorElements,
            };
        }, this.updateAllReferences);
    };

    addEmptyElement = () => {
        this.setState((state) => {
            const newElement = new EditorElement();

            return {
                editorElements: [...state.editorElements, newElement],
            };
        }, this.calculateProportions);
    };

    onTextInputUpdate = (id: string, value: string) => {
        this.udpateEditorElementsState((el) => {
            if (el.id === id) {
                el.mainTitle = value;
            }
        });
    };

    onWorkoutNameUpdate = (value: string) => {
        this.setState((state) => ({
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
                        to={`/workout/${this.state.workoutId}`}
                    >
                        <IconPlay />
                    </Link>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state: any, params: any) => ({
    workout: currentWorkout(state, params.match.params.workoutId) || null,
});

export default withRouter(connect(mapStateToProps)(WorkoutEditor));
