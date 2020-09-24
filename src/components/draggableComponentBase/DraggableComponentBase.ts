import React, { ReactNode, RefObject } from 'react';
import { calcDragDirection, DragDirection, Point } from '@/utils/drag';

interface State {
    initDragPos: { x: number; y: number };
    dragDirection: DragDirection;
    position: Point;
    startTime: number | null;
    lastUpdatePosition: Point;
}

export abstract class DraggableComponentBase<P> extends React.PureComponent<P, State> {
    container: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    requestAnimationFrame: number | null = null;
    dragThreshold = {
        horizontal: 20,
        vertical: 20,
    };

    componentDidMount() {
        this.container?.current?.addEventListener('mousedown', this.handleDragMouseStart);
        this.container?.current?.addEventListener('touchstart', this.handleTouchStart);
        this.container?.current?.addEventListener('touchend', this.handleTouchEnd);
        this.container?.current?.addEventListener('touchmove', this.handleTouchMove);
    }

    componentWillUnmount() {
        this.clearRequestAnimationFrame();
        this.container.current?.removeEventListener('mousedown', this.handleDragMouseStart);
        this.container.current?.removeEventListener('touchstart', this.handleTouchStart);
        this.container.current?.removeEventListener('touchend', this.handleTouchEnd);
        this.container.current?.removeEventListener('touchmove', this.handleTouchMove);
    }

    abstract updatePosition(): void;
    abstract handleDragEnd(): void;
    abstract render(): ReactNode;
    abstract reset(): void;

    get dragStartedWithinItem(): boolean {
        const { x, y } = this.state.initDragPos;

        return x !== -1 && y !== -1;
    }

    get isHorizontalDrag(): boolean {
        const horizontalDrag =
            this.state.dragDirection === DragDirection.LEFT ||
            this.state.dragDirection === DragDirection.RIGHT;

        return this.dragStartedWithinItem && horizontalDrag;
    }

    get isVerticalDrag(): boolean {
        const verticalDrag =
            this.state.dragDirection === DragDirection.UP ||
            this.state.dragDirection === DragDirection.DOWN;

        return this.dragStartedWithinItem && verticalDrag;
    }

    clearRequestAnimationFrame = (): void => {
        if (!this.requestAnimationFrame) return;
        cancelAnimationFrame(this.requestAnimationFrame);

        this.requestAnimationFrame = null;
    };

    setDragDirection = (x: number, y: number): void => {
        if (!(this.state.dragDirection === DragDirection.NONE)) return;
        const dragDirection = calcDragDirection(
            { x, y },
            this.state.initDragPos,
            this.dragThreshold
        );

        this.setState({ dragDirection: dragDirection });
    };

    handleMouseMove = (event: MouseEvent) => {
        if (!this.dragStartedWithinItem) return;

        const { clientX, clientY } = event;
        this.setDragDirection(clientX, clientY);
        this.preventAndUpdatePosition(event, clientX, clientY);
    };

    handleTouchMove = (event: TouchEvent) => {
        if (!this.dragStartedWithinItem || !event.cancelable) return;

        const { clientX, clientY } = event.targetTouches[0];
        this.setDragDirection(clientX, clientY);
        this.preventAndUpdatePosition(event, clientX, clientY);
    };

    handleDragStart = (event: MouseEvent): void => {
        const { clientX, clientY } = event;
        this.reset();
        this.setState({
            initDragPos: { x: clientX, y: clientY },
            startTime: Date.now(),
        });

        this.update();
    };

    handleDragMouseStart = (event: MouseEvent): void => {
        window.addEventListener('mouseup', this.handleDragMouseEnd);
        window.addEventListener('mousemove', this.handleMouseMove);
        this.container?.current?.addEventListener('mouseup', this.handleDragMouseEnd);
        this.container?.current?.addEventListener('mousemove', this.handleMouseMove);

        this.handleDragStart(event);
    };

    handleDragMouseEnd = (): void => {
        window.removeEventListener('mouseup', this.handleDragMouseEnd);
        window.removeEventListener('mousemove', this.handleMouseMove);
        this.container?.current?.removeEventListener('mousemove', this.handleMouseMove);
        this.container?.current?.removeEventListener('mouseup', this.handleDragMouseEnd);

        this.handleDragEnd();
    };

    handleTouchStart = (event: TouchEvent) => {
        window.addEventListener('touchend', this.handleTouchEnd);
        const touch = event.targetTouches[0];
        this.handleDragStart(touch as any);
    };

    handleTouchEnd = (): void => {
        window.removeEventListener('touchend', this.handleTouchEnd);
        this.handleDragEnd();
    };

    preventAndUpdatePosition = (event: Event, clientX: number, clientY: number) => {
        if (!this.isHorizontalDrag) return;
        event.stopPropagation();
        event.preventDefault();

        this.setState((state) => ({
            position: {
                x: clientX - state.initDragPos.x,
                y: clientY - state.initDragPos.y,
            },
        }));
        this.update();
    };

    update = () => {
        if (this.requestAnimationFrame) return;

        this.requestAnimationFrame = requestAnimationFrame(() => {
            this.requestAnimationFrame = null;

            this.updatePosition();
        });
    };
}

export default DraggableComponentBase;
