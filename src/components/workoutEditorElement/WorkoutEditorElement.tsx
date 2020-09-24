import React from 'react';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import { DragDirection, Point } from '@/utils/drag';
import './_workoutEditorElement.scss';

export interface EditorElementProps {
    id: string;
    name: string;
    duration: number;
    color: string;
    height: number;
    onDurationChange(id: string, diff: number): void;
    onPositionChange(id: string, diff: number): void;
    onColorChange(id: string): void;
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
            initDragPos: { x: 0, y: 0 },
            dragDirection: DragDirection.NONE,
            position: {
                x: 0,
                y: 0,
            },
            startTime: null,
            lastUpdatePosition: { x: 0, y: 0 },
        };
    }
    dragThreshold = {
        horizontal: 10,
        vertical: 10,
    };

    reset = () => {
        this.setState({
            initDragPos: { x: -1, y: -1 },
            dragDirection: DragDirection.NONE,
            position: {
                x: 0,
                y: 0,
            },
        });
    };

    componentDidUpdate(prevProps: any) {
        if (prevProps.height !== this.props.height) {
            this.container.current?.classList.add('show-duration');
        }
    }

    updatePosition = (): void => {
        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;
        const diffX = this.state.lastUpdatePosition.x - this.state.position.x;
        const diffY = this.state.lastUpdatePosition.y - this.state.position.y;

        const shouldUpdateDuration = elapsed > interval && this.isHorizontalDrag;
        const shouldUpdatePosition = elapsed > interval && this.isVerticalDrag;

        if (shouldUpdateDuration) {
            this.props.onDurationChange(this.props.id, diffX);
        } else if (shouldUpdatePosition) {
            this.props.onPositionChange(this.props.id, diffY);
        }
        this.setState({
            lastUpdatePosition: { x: this.state.position.x, y: this.state.position.y },
        });
    };

    handleDragEnd = (): void => {
        const element = this.container.current;
        setTimeout(() => {
            element?.classList.remove('show-duration');
        }, 250);
    };

    render() {
        const { name, duration, color, height = '#f3f3f3' } = this.props;
        return (
            <div
                className="editor-element"
                style={{ backgroundColor: `${color}`, height: `${height}px` }}
                ref={this.container}
            >
                <p className="editor-element__name">{name}</p>
                <p className="editor-element__duration">{height}</p>
                <div
                    className="editor-element__duration-change"
                    style={{ backgroundColor: `${color}` }}
                >
                    <p>{height}</p>
                </div>
            </div>
        );
    }
}

export default WorkoutEditorElement;
