import React, { CSSProperties, SyntheticEvent } from 'react';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import { DragDirection, Point } from '@/utils/drag';
import { formatSecondsToMinutes } from '@/utils/format';
import './_workoutEditorElement.scss';
import { IconColorFill, IconDelete } from '@/misc/icons';
import Button from '@/components/button/Button';

import { ColorResult, CirclePicker } from 'react-color';

import TextInput from '@/components/textInput/TextInput';

export interface EditorElementProps {
    id: string;
    name: string;
    duration: number;
    color: string;
    height: number;
    offsetTop: number;
    swapIndex: number;
    swapHighlight: boolean;
    onDurationChange(id: string, diff: number): void;
    onPositionChange(id: string, clientY: number): void;
    onPositionUpdate(id: string, clientY: number): void;
    onColorChange(id: string, newColor: ColorResult, event?: SyntheticEvent): void;
    onDelete(id: string): void;
    updateOffsetTop(id: string, offsetTop: number): void;
    onTextInputUpdate(id: string, value: string): void;
}

interface DraggableComponentBaseState {
    initDragPos: Point;
    dragDirection: DragDirection;
    position: Point;
    startTime: number | null;
    lastUpdatePosition: Point;
}

interface WorkoutEditorState extends DraggableComponentBaseState {
    showPicker: boolean;
    inputFocused: boolean;
}

class WorkoutEditorElement extends DraggableComponentBase<EditorElementProps, WorkoutEditorState> {
    constructor(props: EditorElementProps) {
        super(props);
        this.state = {
            initDragPos: new Point(),
            dragDirection: DragDirection.NONE,
            position: new Point(),
            startTime: null,
            lastUpdatePosition: new Point(),
            showPicker: false,
            inputFocused: false,
        };
    }
    dragThreshold = {
        horizontal: 10,
        vertical: 10,
    };

    reset = () => {
        this.container.current?.classList.remove('return');

        this.setState({
            initDragPos: new Point(-1, -1),
            dragDirection: DragDirection.NONE,
            position: new Point(),
        });
    };

    componentDidUpdate(prevProps: any) {
        if (prevProps.id !== this.props.id) return;
        if (prevProps.duration !== this.props.duration) {
            this.container.current?.classList.add('show-duration');
        }
        this.updateOffset();
    }

    updatePosition = (clientPosition?: Point): void => {
        if (this.state.inputFocused) return;

        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;
        const diffX = this.state.lastUpdatePosition.x - this.state.position.x;

        const shouldUpdateDuration = elapsed > interval && this.isHorizontalDrag;
        const shouldUpdatePosition = elapsed > interval && this.isVerticalDrag;
        const minimalDuration = 30;
        const isDurationBelowMinimal = diffX < 0 && this.props.duration + diffX < minimalDuration;

        if (!isDurationBelowMinimal && shouldUpdateDuration) {
            this.props.onDurationChange(this.props.id, diffX);
            if (this.state.showPicker) this.setState({ showPicker: false });
        } else if (shouldUpdatePosition) {
            this.container.current!.style.transform = `translateY(${this.state.position.y}px)`;
            if (clientPosition) {
                const { y: clientY } = clientPosition;
                this.props.onPositionChange(this.props.id, clientY);
            }
            if (this.state.showPicker) this.setState({ showPicker: false });
        }
        this.setState({
            lastUpdatePosition: new Point(this.state.position.x, this.state.position.y),
        });
    };

    handleDragEnd = (): void => {
        const element = this.container.current;
        this.reset();
        if (this.props.swapIndex !== -1) {
            this.props.onPositionUpdate(this.props.id, this.props.swapIndex);
            this.container.current!.style.transform = `translateY(0px)`;
        } else {
            this.playReturnAnimation();
        }

        element?.classList.remove('show-duration');
        element?.classList.remove('moving');
    };

    onComponentDidMount() {
        this.updateOffset();
    }

    updateOffset() {
        const offsetTop = this.container.current?.offsetTop || 0;
        this.props.updateOffsetTop(this.props.id, offsetTop);
    }

    playReturnAnimation = (): void => {
        this.container.current!.style.transform = `translateY(0px)`;
        this.container.current!.classList.add('return');
    };

    togglePicker = (on?: boolean) => {
        this.setState((state) => ({
            ...state,
            showPicker: on !== undefined ? on : !state.showPicker,
        }));
    };

    onTextInputUpdate = (value: string) => {
        this.props.onTextInputUpdate(this.props.id, value);
    };

    onInputFocusChange = (isFocused: boolean) => [
        this.setState({
            inputFocused: isFocused,
        }),
    ];

    render() {
        const { name, duration, color = '#f3f3f3', height } = this.props;
        const swapHighlightClassname = this.props.swapHighlight ? 'swap-highlight' : '';
        const moveClassname = this.isVerticalDrag ? 'moving' : '';
        const style: CSSProperties & { '--color': string } = {
            backgroundColor: color,
            height: `${height}%`,
            '--color': color,
        };
        if (this.state.showPicker) {
            style.zIndex = 200;
        }

        return (
            <div
                className={`editor-element ${swapHighlightClassname} ${moveClassname}`}
                style={style}
                ref={this.container}
                data-id={this.props.id}
            >
                <div className="editor-element__button-group">
                    <Button handleClick={() => this.togglePicker()} variant="editor-element">
                        <IconColorFill className="editor-element__color" />
                    </Button>
                    <Button
                        handleClick={(event) => this.props.onDelete(this.props.id)}
                        variant="editor-element"
                    >
                        <IconDelete className="editor-element__delete" />
                    </Button>

                    {this.state.showPicker && (
                        <CirclePicker
                            color={color}
                            onChange={(color: ColorResult) =>
                                this.props.onColorChange(this.props.id, color)
                            }
                            className="editor-element__picker"
                        />
                    )}
                </div>
                {/* <p className="editor-element__name no-select">{name}</p> */}

                <TextInput
                    classNameVariant="editor-element"
                    value={name}
                    onTextInputUpdate={this.onTextInputUpdate}
                    onFocusChange={this.onInputFocusChange}
                />
                <p className="editor-element__duration no-select">
                    {formatSecondsToMinutes(duration)}
                </p>
                <div
                    className="editor-element__duration-change no-select"
                    style={{ backgroundColor: `${color}` }}
                >
                    <p className="no-select">{formatSecondsToMinutes(duration)}</p>
                </div>
            </div>
        );
    }
}

export default WorkoutEditorElement;
