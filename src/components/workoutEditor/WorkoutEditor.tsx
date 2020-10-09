import React, { createRef, RefObject } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { currentWorkout, Interval, saveWorkout, WorkoutData } from '@/store/slices/workouts';

import Modal from '@/components/modal/Modal';
import { Button } from '../button';
import WorkoutEditorElement from '@/components/workoutEditorElement/WorkoutEditorElement';
import Input from '../input/Input';
import { mockEditorElements } from './mockData';
import { ColorResult } from 'react-color';
import { IconPlus, IconPlay, IconSettings } from '@/misc/icons';
import EditorElement, { BorderVariant } from '@/components/workoutEditorElement/EditorElement';
import { roundBy5 } from '@/utils/math';

import './_workoutEditor.scss';
import { formatSecondsToMinutesLeftRounded } from '@/utils/format';

type WorkoutEditorState = {
    editorElements: EditorElement[];
    workoutName: string;
    workoutId: string;
    coreIterations: number;
    setIterations: number;
    showSettings: boolean;
    disableDelete: boolean;
    disableAdd: boolean;
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
        duration: roundBy5(editorElement.duration),
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
            showSettings: false,
            disableDelete: false,
            disableAdd: false,
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
                    onSubsectionTitlesUpdate={this.onSubsectionTitlesUpdate}
                    parentOffsetTop={this.wrapperRef.current?.offsetTop || 0}
                    coreIterations={this.state.coreIterations}
                    ref={newRef}
                    index={index}
                    lastIndex={array.length - 1}
                    disableDelete={this.state.disableDelete}
                    {...element}
                />
            );
        });
    }

    componentDidMount() {
        this.setDisabledStates();
        this.calculateProportions();
        this.updateCoreBorders();
    }

    componentDidUpdate(prevProps: WorkoutEditorProps, prevState: WorkoutEditorState) {
        const hasEditorElementsAmountChanged =
            prevState.editorElements.length !== this.state.editorElements.length;
        hasEditorElementsAmountChanged && this.setDisabledStates();
    }

    setDisabledStates = () => {
        const elements = this.state.editorElements;
        const shouldDisableDelete = elements.length <= 3;
        const shouldDisableAdd = elements.length >= 6;

        this.setState({ disableAdd: shouldDisableAdd, disableDelete: shouldDisableDelete });
    };

    get totalDurationForHeightCalculation(): number {
        return this.state.editorElements.reduce((acc, curr): any => {
            return { duration: acc.duration + curr.duration };
        }).duration;
    }

    get totalDuration(): number {
        const elements = [...this.state.editorElements];
        const firstElementDuration = elements[0].duration;
        const lastElementDuration = elements[elements.length - 1].duration;

        const singleCoreDuration = elements
            .splice(1, elements.length - 2)
            .reduce((acc, curr): any => {
                return { duration: acc.duration + curr.duration };
            }).duration;

        const totalCoresDuration = singleCoreDuration * this.state.coreIterations;

        const totalSetsDuration =
            (totalCoresDuration + lastElementDuration) * this.state.setIterations;

        return firstElementDuration + totalSetsDuration;
    }

    updateCoreBorders = () => {
        if (this.state.editorElements.length === 3) {
            this.udpateEditorElementsState((el, index) => {
                if (index === 1) {
                    el.borderVariant = BorderVariant.ALL;
                } else {
                    el.borderVariant = BorderVariant.NONE;
                }
            });
        } else {
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
        }
    };

    durationStep = (duration: number) => {
        return duration - (duration % 5);
    };

    calculateProportions = () => {
        const calcPercentage = (duration: number): number => {
            const percentage = 100 / (this.totalDurationForHeightCalculation / duration);
            return percentage;
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
                const newDuration = element.duration + diff;
                if (element.id === id && !(newDuration <= 0)) {
                    element.duration = newDuration < 15 ? 15 : newDuration;
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

            if (shouldSwap) {
                this.udpateEditorElementsState((el, index) => {
                    if (index === elementIndex) {
                        el.swapHighlight = true;
                    }
                    if (el.id === id) {
                        el.swapIndex = elementIndex;
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
        if (this.editorElements.length === 3) return;
        const referenceIndex = this.references.findIndex((el) => el.current?.props.id === id);
        this.references.splice(referenceIndex, 1);
        this.setState(
            (state) => {
                const newEditorElements = [...state.editorElements];
                const elementIndex = newEditorElements.findIndex((el) => el.id === id);
                newEditorElements.splice(elementIndex, 1);

                return {
                    editorElements: newEditorElements,
                };
            },
            () => {
                this.calculateProportions();
                this.updateCoreBorders();
            }
        );
    };

    updateOffsetTop = (id: string, offsetTop: number) => {
        this.udpateEditorElementsState((element) => {
            if (element.id === id) {
                element.offsetTop = offsetTop;
            }
        });
    };

    onPositionUpdate = (id: string, swapIndex: number) => {
        if (swapIndex === this.state.editorElements.length - 1 || swapIndex === 0) return;

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
        if (this.state.editorElements.length >= 6) return;
        this.setState(
            (state) => {
                const newElement = new EditorElement();
                const newEditorElements = [...state.editorElements];
                newEditorElements.splice(newEditorElements.length - 1, 0, newElement);
                return {
                    editorElements: newEditorElements,
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

    onSubsectionTitlesUpdate = (id: string, subsectionTitles: string[]) => {
        this.udpateEditorElementsState((el) => {
            if (el.id === id) {
                el.subsectionTitles = subsectionTitles;
            }
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

        const editorSettingsModal = (
            <Modal
                isOpen={this.state.showSettings}
                handleClose={() => this.setState({ showSettings: false })}
            >
                <div className="workout-editor__settings-modal workout-editor__modal">
                    {editorInputs}
                </div>
            </Modal>
        );

        return (
            <>
                {editorSettingsModal}
                <section className="workout-editor">
                    <div className="workout-editor__top-bar">
                        <div className="workout-editor__total-duration-display">
                            <span>
                                ~ {formatSecondsToMinutesLeftRounded(this.totalDuration)} min
                            </span>
                        </div>
                        <Button handleClick={() => this.setState({ showSettings: true })}>
                            <IconSettings />
                        </Button>

                        <Button handleClick={this.addEmptyElement} disabled={this.state.disableAdd}>
                            <IconPlus />
                        </Button>
                        <Button
                            additionalClassName="workout-editor__play-btn"
                            handleClick={this.saveData}
                        >
                            <IconPlay />
                        </Button>
                    </div>
                    <div className="workout-editor__elements" ref={this.wrapperRef}>
                        {this.editorElements}
                    </div>
                </section>
            </>
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
