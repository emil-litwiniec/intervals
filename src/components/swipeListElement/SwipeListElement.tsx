import React, { ReactNode, RefObject } from 'react';
import { calcDragDirection, DragDirection } from '@/utils/drag';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import './_swipeListElement.scss';

interface Props {
    leftElement: ISwipeListElement;
    rightElement: ISwipeListElement;
}

interface ISwipeListElement {
    content: ReactNode;
    handler: Function;
}

interface State {
    initDragPos: { x: number; y: number };
    dragDirection: DragDirection;
    position: number;
    startTime: number | null;
}

class SwipeListElement extends DraggableComponentBase<Props, State> {
    state: State;
    leftElementRef: RefObject<HTMLDivElement>;
    rightElementRef: RefObject<HTMLDivElement>;
    mainElementRef: RefObject<HTMLDivElement>;

    dragThreshold = {
        horizontal: 10,
        vertical: 10,
    };

    constructor(props: Props) {
        super(props);
        this.leftElementRef = React.createRef<HTMLDivElement>();
        this.rightElementRef = React.createRef<HTMLDivElement>();
        this.mainElementRef = React.createRef<HTMLDivElement>();
        this.state = {
            initDragPos: { x: 0, y: 0 },
            dragDirection: DragDirection.NONE,
            position: 0,
            startTime: null,
        };
    }

    reset = () => {
        this.mainElementRef.current?.classList.remove('return');
        this.setState({
            initDragPos: { x: -1, y: -1 },
            dragDirection: DragDirection.NONE,
            position: 0,
        });
    };

    handleDragEnd = (): void => {
        if (!this.isSwiping || !this.mainElementRef) return;

        const isSmallDevice = window.innerWidth < 1300;
        const threshold = isSmallDevice ? 0.3 : 0.18; // drag distance to trigger action (in %)
        let actionTriggered = false;

        const swipedLeft =
            this.state.position <
            Number(this.mainElementRef?.current?.offsetWidth) * threshold * -1;
        const swipedRight =
            this.state.position > Number(this.mainElementRef?.current?.offsetWidth) * threshold;

        if (swipedLeft) {
            this.handleSwipeLeft();
            actionTriggered = true;
        } else if (swipedRight) {
            this.handleSwipeRight();
            actionTriggered = true;
        }
        this.reset();

        !actionTriggered && this.playReturnAnimation();
    };

    playReturnAnimation = (): void => {
        this.mainElementRef.current!.style.transform = `translateX(0px)`;
        this.mainElementRef.current!.classList.add('return');
    };

    get dragStartedWithinItem(): boolean {
        const { x, y } = this.state.initDragPos;

        return x !== -1 && y !== -1;
    }

    get isSwiping(): boolean {
        const horizontalDrag =
            this.state.dragDirection === DragDirection.LEFT ||
            this.state.dragDirection === DragDirection.RIGHT;

        return this.dragStartedWithinItem && horizontalDrag;
    }

    handleMouseMove = (event: MouseEvent) => {
        if (this.dragStartedWithinItem) {
            const { clientX, clientY } = event;
            this.setDragDirection(clientX, clientY);
            this.preventAndUpdatePosition(event, clientX);
        }
    };

    handleTouchMove = (event: TouchEvent) => {
        if (this.dragStartedWithinItem) {
            const { clientX, clientY } = event.targetTouches[0];
            this.setDragDirection(clientX, clientY);
            if (!event.cancelable) return;
            this.preventAndUpdatePosition(event, clientX);
        }
    };

    updatePosition = (): void => {
        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;

        const shouldSwipe = elapsed > interval && this.isSwiping;
        if (!shouldSwipe) return;

        const contentToShow = this.state.position < 0 ? this.leftElementRef : this.rightElementRef;

        this.mainElementRef.current!.style.transform = `translateX(${this.state.position}px)`;

        contentToShow.current!.style.opacity = '1';
        let contentToHide = this.state.position < 0 ? this.rightElementRef : this.leftElementRef;

        if (contentToHide) {
            contentToHide.current!.style.opacity = '0';
        }
    };

    preventAndUpdatePosition = (event: Event, clientX: number) => {
        if (!this.isSwiping) return;
        event.stopPropagation();
        event.preventDefault();

        this.setState((state) => ({ position: clientX - state.initDragPos.x }));
        this.update();
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

    handleDragStart = (event: MouseEvent): void => {
        const { clientX, clientY } = event;
        this.reset();
        this.setState({
            initDragPos: { x: clientX, y: clientY },
            startTime: Date.now(),
        });

        this.update();
    };

    handleSwipeLeft = (): void => {
        const { leftElement } = this.props;
        const { handler } = leftElement;
        handler && handler();
    };

    handleSwipeRight = (): void => {
        const { rightElement } = this.props;
        const { handler } = rightElement;
        handler && handler();
    };

    render() {
        const { leftElement, rightElement, children } = this.props;
        return (
            <div className="swipe-list-element" ref={this.container}>
                <div className="swipe-list-element__main" ref={this.mainElementRef}>
                    {children}
                </div>
                <div className="swipe-list-element__side" ref={this.leftElementRef}>
                    {leftElement.content}
                </div>
                <div className="swipe-list-element__side" ref={this.rightElementRef}>
                    {rightElement.content}
                </div>
            </div>
        );
    }
}

export default SwipeListElement;
