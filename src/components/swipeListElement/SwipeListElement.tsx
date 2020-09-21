import React, { ReactNode, RefObject } from 'react';
import { calcDragDirection, DragDirection, DragThreshold } from '@/utils/drag';
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

class SwipeListElement extends React.PureComponent<Props, State> {
    container: RefObject<HTMLDivElement>;
    requestAnimationFrame: number | null = null;
    state: State;
    leftElementRef: RefObject<HTMLDivElement>;
    rightElementRef: RefObject<HTMLDivElement>;
    mainElementRef: RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.container = React.createRef<HTMLDivElement>();
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

    clearRequestAnimationFrame = (): void => {
        if (!this.requestAnimationFrame) return;
        cancelAnimationFrame(this.requestAnimationFrame);

        this.requestAnimationFrame = null;
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

    handleDragEnd = (): void => {
        const threshold = 0.65;
        let actionTriggered = false;

        if (!this.isSwiping || !this.mainElementRef) return;

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

    handleDragMouseStart = (event: MouseEvent): void => {
        window.addEventListener('mouseup', this.handleDragMouseEnd);
        window.addEventListener('mousemove', this.handleMouseMove);
        this.container?.current?.addEventListener('mouseup', this.handleDragMouseEnd);
        this.container?.current?.addEventListener('mousemove', this.handleMouseMove);

        this.handleDragStart(event);
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

    get dragThreshold(): DragThreshold {
        return {
            // horizontal: this.props.swipeStartThreshold || 10,
            // vertical: this.props.scrollStartThreshold || 10
            horizontal: 10,
            vertical: 10,
        };
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

    update = () => {
        if (this.requestAnimationFrame) return;

        this.requestAnimationFrame = requestAnimationFrame(() => {
            this.requestAnimationFrame = null;

            this.updatePosition();
        });
    };

    updatePosition = (): void => {
        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;

        const shouldSwipe = elapsed > interval && this.isSwiping;
        if (!shouldSwipe) return;

        const contentToShow = this.state.position < 0 ? this.leftElementRef : this.rightElementRef;

        this.mainElementRef.current!.style.transform = `translateX(${this.state.position}px)`;

        const opacity = (Math.abs(this.state.position) / 100).toFixed(2);
        const shouldUpdateOpacity =
            Number(opacity) < 1 && opacity !== contentToShow.current?.style.opacity;

        if (!shouldUpdateOpacity) return;

        contentToShow.current!.style.opacity = opacity;
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

    handleDragMouseEnd = (): void => {
        window.removeEventListener('mouseup', this.handleDragMouseEnd);
        window.removeEventListener('mousemove', this.handleMouseMove);

        this.container?.current?.removeEventListener('mousemove', this.handleMouseMove);
        this.container?.current?.removeEventListener('mouseup', this.handleDragMouseEnd);

        this.handleDragEnd();
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
