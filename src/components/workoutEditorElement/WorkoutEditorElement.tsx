import React from 'react';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import { DragDirection, Point } from '@/utils/drag';
import { formatSecondsToMinutes } from '@/utils/format';
import './_workoutEditorElement.scss';

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
    onColorChange(id: string): void;
    updateOffsetTop(id: string, offsetTop: number): void;
}

interface State {
    initDragPos: Point;
    dragDirection: DragDirection;
    position: Point;
    startTime: number | null;
    lastUpdatePosition: Point;
}

class WorkoutEditorElement extends DraggableComponentBase<EditorElementProps> {
    state: State;

    constructor(props: EditorElementProps) {
        super(props);
        this.state = {
            initDragPos: new Point(),
            dragDirection: DragDirection.NONE,
            position: new Point(),
            startTime: null,
            lastUpdatePosition: new Point(),
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
        } else if (shouldUpdatePosition) {
            this.container.current!.style.transform = `translateY(${this.state.position.y}px)`;
            if (clientPosition) {
                const { y: clientY } = clientPosition;
                this.props.onPositionChange(this.props.id, clientY);
            }
        }
        this.setState({
            lastUpdatePosition: new Point(this.state.position.x, this.state.position.y),
        });
    };

    handleDragEnd = (): void => {
        const element = this.container.current;
        this.reset();
        setTimeout(() => {
            if (this.props.swapIndex !== -1) {
                this.props.onPositionUpdate(this.props.id, this.props.swapIndex);
                this.container.current!.style.transform = `translateY(0px)`;
            } else {
                this.playReturnAnimation();
            }

            element?.classList.remove('show-duration');
            element?.classList.remove('moving');
        }, 250);
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

    render() {
        const { name, duration, color = '#f3f3f3', height } = this.props;
        const swapHighlightClassname = this.props.swapHighlight ? 'swap-highlight' : '';
        const moveClassname = this.isVerticalDrag ? 'moving' : '';
        const style = { backgroundColor: color, height: `${height}%`, '--color': color };

        return (
            <div
                className={`editor-element ${swapHighlightClassname} ${moveClassname}`}
                style={style}
                ref={this.container}
                data-id={this.props.id}
            >
                <p className="editor-element__name">{name}</p>
                <p className="editor-element__duration">{formatSecondsToMinutes(duration)}</p>
                <div
                    className="editor-element__duration-change"
                    style={{ backgroundColor: `${color}` }}
                >
                    <p>{formatSecondsToMinutes(duration)}</p>
                </div>
            </div>
        );
    }
}

export default WorkoutEditorElement;
