import React, { CSSProperties, SyntheticEvent } from 'react';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import { DragDirection, Point } from '@/utils/drag';
import { formatSecondsToMinutes } from '@/utils/format';
import './_workoutEditorElement.scss';
import { IconColorFill, IconDelete } from '@/misc/icons';
import Button from '@/components/button/Button';
import Modal from '@/components/modal/Modal';

import SubsectionTitlesEditor from '@/components/subsectionTitlesEditor/SubsectionTitlesEditor';

import { ColorResult, CirclePicker } from 'react-color';

import Input from '@/components/input/Input';
import { BorderVariant } from './EditorElement';
import { roundBy5 } from '@/utils/math';

export interface EditorElementProps {
    id: string;
    mainTitle: string;
    subsectionTitles: string[];
    duration: number;
    color: string;
    height: number;
    offsetTop: number;
    coreIterations: number;
    swapIndex: number;
    swapHighlight: boolean;
    borderVariant: BorderVariant;
    parentOffsetTop: number;
    index: number;
    lastIndex: number;
    onDurationChange(id: string, diff: number): void;
    onPositionChange(id: string, clientY: number): void;
    onPositionUpdate(id: string, clientY: number): void;
    onColorChange(id: string, newColor: ColorResult, event?: SyntheticEvent): void;
    onDelete(id: string): void;
    updateOffsetTop(id: string, offsetTop: number): void;
    onTextInputUpdate(id: string, value: string): void;
    onSubsectionTitlesUpdate(id: string, subsectionTitles: string[]): void;
}

type DraggableComponentBaseState = {
    initDragPos: Point;
    dragDirection: DragDirection;
    position: Point;
    startTime: number | null;
    lastUpdatePosition: Point;
};

type WorkoutEditorState = DraggableComponentBaseState & {
    showPicker: boolean;
    showSubsectionTitlesModal: boolean;
    inputFocused: boolean;
};

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
            showSubsectionTitlesModal: false,
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

    get shouldNotMove(): boolean {
        return (
            this.props.index === 0 ||
            this.props.index === this.props.lastIndex ||
            this.props.lastIndex === 2
        );
    }

    updatePosition = (clientPosition?: Point): void => {
        if (this.state.inputFocused) return;

        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;
        const diffX = this.state.lastUpdatePosition.x - this.state.position.x;

        const shouldUpdateDuration = elapsed > interval && this.isHorizontalDrag;
        const shouldUpdatePosition = elapsed > interval && this.isVerticalDrag;

        if (shouldUpdateDuration) {
            this.props.onDurationChange(this.props.id, diffX);
            if (this.state.showPicker) this.setState({ showPicker: false });
        } else if (shouldUpdatePosition) {
            if (this.shouldNotMove) return;
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
        this.props.updateOffsetTop(this.props.id, offsetTop + this.props.parentOffsetTop);
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

    get instruction() {
        const className = 'editor-element__instruction';
        switch (this.props.index) {
            case 0:
                return <span className={className}>PREPARE</span>;
            case 1:
                return (
                    <span className={className}>
                        CORE x
                        <span className={className + '--iterations'}>
                            {this.props.coreIterations}
                        </span>
                    </span>
                );
            case this.props.lastIndex:
                return <span className={className}>REST (time between sets)</span>;
            default:
                return null;
        }
    }

    render() {
        const {
            mainTitle,
            duration,
            color = '#f3f3f3',
            height,
            borderVariant,
            subsectionTitles = [],
            coreIterations,
            lastIndex,
            index,
        } = this.props;
        const swapHighlightClassname = this.props.swapHighlight ? 'swap-highlight' : '';
        const moveClassname = !this.shouldNotMove && this.isVerticalDrag ? 'moving' : '';
        const style: CSSProperties & { '--color': string } = {
            backgroundColor: color,
            height: `${height}%`,
            '--color': color,
        };
        if (this.state.showPicker) {
            style.zIndex = 200;
        }

        const shouldShowSubsectionTitlesEditor = index !== 0 && index !== lastIndex;

        const subsectionTitlesEditButton = shouldShowSubsectionTitlesEditor && (
            <Button
                handleClick={(event) => this.setState({ showSubsectionTitlesModal: true })}
                variant="editor-element"
            >
                <span>Set subsection names</span>
            </Button>
        );
        const colorPicker = this.state.showPicker && (
            <CirclePicker
                color={color}
                onChange={(color: ColorResult) => this.props.onColorChange(this.props.id, color)}
                className="editor-element__picker"
            />
        );

        const editorElement = (
            <div
                className={`editor-element ${swapHighlightClassname} ${moveClassname} ${borderVariant}`}
                style={style}
                ref={this.container}
            >
                {this.instruction}
                <div className="editor-element__button-group">
                    {subsectionTitlesEditButton}
                    <Button handleClick={() => this.togglePicker()} variant="editor-element">
                        <IconColorFill className="editor-element__color" />
                    </Button>
                    <Button
                        handleClick={(event) => this.props.onDelete(this.props.id)}
                        variant="editor-element"
                    >
                        <IconDelete className="editor-element__delete" />
                    </Button>

                    {colorPicker}
                </div>
                <Input
                    classNameVariant="editor-element"
                    value={mainTitle}
                    onInputUpdate={this.onTextInputUpdate}
                    onFocusChange={this.onInputFocusChange}
                />
                <p className="editor-element__duration no-select">
                    {formatSecondsToMinutes(roundBy5(duration))}
                </p>
                <div
                    className="editor-element__duration-change no-select"
                    style={{ backgroundColor: `${color}` }}
                >
                    <p className="no-select">{formatSecondsToMinutes(roundBy5(duration))}</p>
                </div>
            </div>
        );

        const subsectionTitlesModal = shouldShowSubsectionTitlesEditor && (
            <Modal
                handleClose={() => {
                    this.setState({ showSubsectionTitlesModal: false });
                }}
                isOpen={this.state.showSubsectionTitlesModal}
            >
                <SubsectionTitlesEditor
                    mainTitle={mainTitle}
                    color={color}
                    subsectionTitles={subsectionTitles}
                    coreIterations={coreIterations}
                    onSubsectionTitlesUpdate={(subsectionTitles: string[]) =>
                        this.props.onSubsectionTitlesUpdate(this.props.id, subsectionTitles)
                    }
                />
            </Modal>
        );

        return (
            <>
                {subsectionTitlesModal}
                {editorElement}
            </>
        );
    }
}

export default WorkoutEditorElement;
