import React, { ReactNode, RefObject } from 'react';
import { DragDirection, Point } from '@/utils/drag';
import DraggableComponentBase from '@/components/draggableComponentBase/DraggableComponentBase';
import './_swipeListElement.scss';

interface Props {
    leftElement: SwipeListSideElement;
    rightElement: SwipeListSideElement;
}

interface SwipeListSideElement {
    content: ReactNode;
    handler: Function;
}

class SwipeListElement extends DraggableComponentBase<Props> {
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
            initDragPos: new Point(),
            dragDirection: DragDirection.NONE,
            position: new Point(),
            startTime: null,
            lastUpdatePosition: new Point(),
        };
    }

    reset = () => {
        this.mainElementRef.current?.classList.remove('return');
        this.setState({
            initDragPos: new Point(-1, -1),
            dragDirection: DragDirection.NONE,
            position: new Point(),
        });
    };

    handleDragEnd = (): void => {
        if (!this.isHorizontalDrag || !this.mainElementRef) return;

        const isSmallDevice = window.innerWidth < 1300;
        const threshold = isSmallDevice ? 0.3 : 0.18; // drag distance to trigger action (in %)
        let actionTriggered = false;

        const swipedLeft =
            this.state.position.x <
            Number(this.mainElementRef?.current?.offsetWidth) * threshold * -1;
        const swipedRight =
            this.state.position.x > Number(this.mainElementRef?.current?.offsetWidth) * threshold;

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

    updatePosition = (): void => {
        const now = Date.now();
        const elapsed = now - this.state.startTime!;
        const interval = 1000 / 60;

        const shouldSwipe = elapsed > interval && this.isHorizontalDrag;
        if (!shouldSwipe) return;

        const contentToShow =
            this.state.position.x < 0 ? this.leftElementRef : this.rightElementRef;

        this.mainElementRef.current!.style.transform = `translateX(${this.state.position.x}px)`;

        contentToShow.current!.style.opacity = '1';
        let contentToHide = this.state.position.x < 0 ? this.rightElementRef : this.leftElementRef;

        if (contentToHide) {
            contentToHide.current!.style.opacity = '0';
        }
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
