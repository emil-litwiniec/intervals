import React, { createRef, Dispatch, RefObject } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { currentWorkout, Interval, saveWorkout, WorkoutData } from '@/store/slices/workouts';

import { Button } from '../button';
import WorkoutEditorElement from '@/components/workoutEditorElement/WorkoutEditorElement';
import Input from '../textInput/TextInput';
import { mockEditorElements } from './mockData';
import { ColorResult } from 'react-color';
import { IconPlay } from '@/misc/icons';
import EditorElement, { BorderVariant } from '@/components/workoutEditorElement/EditorElement';

import './_workoutEditor.scss';

type WorkoutEditorState = {
    editorElements: EditorElement[];
    workoutName: string;
    workoutId: string;
    coreIterations: number;
    setIterations: number;
};

type DispatchProps = {
    saveWorkout(workoutData: WorkoutData): void;
};

type WorkoutEditorProps = RouteComponentProps &
    DispatchProps & {
        workout: WorkoutData | null;
    };

const editorElementToInterval = (editorElement: EditorElement): Interval => {
    return {
        id: editorElement.id,
        mainTitle: editorElement.mainTitle,
        subsectionTitles: editorElement.subsectionTitles,
        duration: editorElement.duration,
        color: editorElement.color,
    };
};

const mapStateToEditorElements = ({
    startInterval,
    pattern,
    endInterval,
}: WorkoutData): EditorElement[] => {
    return [
        new EditorElement(startInterval),
        ...pattern.map((interval) => new EditorElement(interval)),
        new EditorElement(endInterval),
    ];
};

class WorkoutEditor extends React.Component<WorkoutEditorProps, WorkoutEditorState> {
    state: WorkoutEditorState;

    references: RefObject<WorkoutEditorElement>[] = [];
    wrapperRef: RefObject<HTMLDivElement> = createRef();

    constructor(props: WorkoutEditorProps) {
        super(props);
        this.state = {
            editorElements: props.workout
                ? mapStateToEditorElements(props.workout)
                : [...mockEditorElements],
            workoutName: props.workout ? props.workout.title : 'New Workout',
            workoutId: props.workout ? props.workout.id || uuidv4() : uuidv4(),
            coreIterations: props.workout ? props.workout.coreIterations : 1,
            setIterations: props.workout ? props.workout.setIterations : 1,
        };
    }

    get editorElements() {
        return this.state.editorElements.map((element, index, array) => {
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
                    parentOffsetTop={this.wrapperRef.current?.offsetTop || 0}
                    coreIterations={this.state.coreIterations}
                    ref={newRef}
                    index={index}
                    lastIndex={array.length - 1}
                    {...element}
                />
            );
        });
    }

    componentDidMount() {
        this.calculateProportions();
        this.updateCoreBorders();
    }

    get totalDuration(): number {
        return this.state.editorElements.reduce((acc, curr): any => {
            return { duration: acc.duration + curr.duration };
        }).duration;
    }

    updateCoreBorders = () => {
        this.udpateEditorElementsState((el, index, array) => {
            switch (index) {
                case 0:
                    el.borderVariant = BorderVariant.NONE;
                    break;
                case array.length - 1:
                    el.borderVariant = BorderVariant.NONE;
                    break;
                case array.length - 2:
                    el.borderVariant = BorderVariant.BOTTOM;
                    break;
                case 1:
                    el.borderVariant = BorderVariant.TOP;
                    break;
                default:
                    el.borderVariant = BorderVariant.SIDES;
                    break;
            }
        });
    };

    calculateProportions = () => {
        const calcPercentage = (duration: number): number => {
            return 100 / (this.totalDuration / duration);
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
        this.updateCoreBorders();
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
        this.updateCoreBorders();
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
        callback: (value: EditorElement, index: number, array: EditorElement[]) => void,
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
        this.setState(
            (state) => {
                const newElement = new EditorElement();

                return {
                    editorElements: [...state.editorElements, newElement],
                };
            },
            () => {
                this.calculateProportions();
                this.updateCoreBorders();
            }
        );
    };

    onTextInputUpdate = (id: string, value: string) => {
        this.udpateEditorElementsState((el) => {
            if (el.id === id) {
                el.mainTitle = value;
            }
        });
    };

    onWorkoutNameUpdate = (value: string) => {
        this.setState({
            workoutName: value,
        });
    };

    saveData = () => {
        const editorElements = [...this.state.editorElements];
        let data: WorkoutData = {
            id: this.state.workoutId,
            title: this.state.workoutName,
            totalDuration: this.totalDuration,
            coreIterations: this.state.coreIterations,
            setIterations: this.state.setIterations,
            pattern: [
                ...editorElements
                    .splice(1, editorElements.length - 2)
                    .map((element) => editorElementToInterval(element)),
            ],
            startInterval: editorElementToInterval(editorElements[0]),
            endInterval: editorElementToInterval(editorElements[1]),
        };
        this.props.saveWorkout(data);
        this.props.history.push(`/workout/${this.state.workoutId}`);
    };

    onSetIterationsUpdate = (value: string) => {
        this.setState({
            setIterations: Number(value),
        });
    };

    onCoreIterationsUpdate = (value: string) => {
        this.setState({
            coreIterations: Number(value),
        });
    };

    render() {
        const editorInputs = (
            <div className="workout-editor__inputs">
                <Input
                    value={this.state.workoutName}
                    onInputUpdate={this.onWorkoutNameUpdate}
                    label="Workout Title: "
                    classNameVariant="editor-inputs"
                />

                <Input
                    value={this.state.setIterations}
                    onInputUpdate={this.onSetIterationsUpdate}
                    type="number"
                    label="Total Sets: "
                    classNameVariant="editor-inputs"
                />

                <Input
                    value={this.state.coreIterations}
                    onInputUpdate={this.onCoreIterationsUpdate}
                    type="number"
                    label="Core Iterations per set "
                    classNameVariant="editor-inputs"
                />
            </div>
        );

        return (
            <section className="workout-editor">
                <div className="workout-editor__elements" ref={this.wrapperRef}>
                    {this.editorElements}
                </div>
                <div className="workout-editor__button-wrapper">
                    {editorInputs}
                    <Button handleClick={this.addEmptyElement}>
                        <div>Add interval</div>
                    </Button>

                    <Button
                        additionalClassName="workout-editor__play-btn"
                        handleClick={this.saveData}
                    >
                        <IconPlay />
                    </Button>
                </div>
            </section>
        );
    }
}

const mapDispatch = {
    saveWorkout: saveWorkout,
};

const mapStateToProps = (state: any, params: any) => ({
    workout: currentWorkout(state, params.match.params.workoutId) || null,
});

export default withRouter(connect(mapStateToProps, mapDispatch)(WorkoutEditor));
