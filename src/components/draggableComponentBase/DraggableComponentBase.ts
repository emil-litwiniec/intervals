import React, { ReactNode, RefObject } from 'react';

export abstract class DraggableComponentBase<P, S> extends React.PureComponent<P, S> {
    container: RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    requestAnimationFrame: number | null = null;

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
    abstract handleDragStart(event: any): void;
    abstract handleDragEnd(): void;
    abstract handleTouchMove(event: TouchEvent): void;
    abstract handleMouseMove(event: MouseEvent): void;
    abstract render(): ReactNode;

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

    clearRequestAnimationFrame = (): void => {
        if (!this.requestAnimationFrame) return;
        cancelAnimationFrame(this.requestAnimationFrame);

        this.requestAnimationFrame = null;
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
