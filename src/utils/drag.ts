export interface Point {
    x: number;
    y: number;
}

export interface DragThreshold {
    horizontal: number;
    vertical: number;
}

export enum DragDirection {
    UP,
    DOWN,
    RIGHT,
    LEFT,
    NONE,
}

export const calcDragDirection = (
    currentPos: Point,
    initPos: Point,
    threshold: DragThreshold
): DragDirection => {
    const { x: currentX, y: currentY } = currentPos;
    const { x: initX, y: initY } = initPos;
    const horizontalDistance = Math.abs(currentX - initX);
    const verticalDistance = Math.abs(currentY - initY);

    const isBelowThreshold =
        horizontalDistance <= threshold.horizontal && verticalDistance <= threshold.vertical;

    if (isBelowThreshold) return DragDirection.NONE;

    const angle = Math.atan2(currentY - initY, currentX - initX);
    const octant = Math.round((8 * angle) / (2 * Math.PI) + 8) % 8;

    const isDirectionRight = octant === 0;
    const isDirectionDown = octant >= 1 && octant <= 3;
    const isDirectionLeft = octant === 4;
    const isDirectionUp = octant >= 5 && octant <= 7;

    const isInHorizontalThreshold = horizontalDistance > threshold.horizontal;
    const isInVerticalThreshold = verticalDistance > threshold.vertical;

    if (isDirectionRight && isInHorizontalThreshold) {
        return DragDirection.RIGHT;
    } else if (isDirectionLeft && isInHorizontalThreshold) {
        return DragDirection.LEFT;
    } else if (isDirectionDown && isInVerticalThreshold) {
        return DragDirection.DOWN;
    } else if (isDirectionUp && isInVerticalThreshold) {
        return DragDirection.UP;
    }

    return DragDirection.NONE;
};
