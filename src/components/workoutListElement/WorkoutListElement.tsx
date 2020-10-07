import React, { ReactNode } from 'react';
import SwipeListElement from '@/components/swipeListElement/SwipeListElement';
import { useHistory } from 'react-router-dom';
import './_workoutListElement.scss';
import { IconPlay, IconEdit, IconDelete } from '@/misc/icons';
import Button from '@/components/button/Button';
import { formatSecondsToMinutesLeftRounded } from '@/utils/format';
import { useDispatch } from 'react-redux';
import { deleteWorkout } from '@/store/slices/workouts';

type SideListElement = {
    classNameVariant: string;
    textContent: string;
    icon: ReactNode;
};

export type WorkoutProps = {
    workoutId: string;
    workoutName: string;
    workoutDuration: number;
};

const WorkoutListElement: React.FC<WorkoutProps> = ({
    workoutId,
    workoutName,
    workoutDuration,
}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const createSwipeListSideElement = ({
        classNameVariant,
        textContent,
        icon,
    }: SideListElement) => {
        return (
            <div
                className={`workout-list-side-element workout-list-side-element--${classNameVariant}`}
            >
                {icon}
                <span className="workout-list-side-element__text-content">{textContent}</span>
            </div>
        );
    };

    const editAction = createSwipeListSideElement({
        classNameVariant: 'left',
        textContent: 'Edit',
        icon: <IconEdit className="workout-list-side-element__icon" />,
    });

    const removeAction = createSwipeListSideElement({
        classNameVariant: 'right',
        textContent: 'Remove',
        icon: <IconDelete className="workout-list-side-element__icon" />,
    });

    const handleEditAction = () => {
        history.push(`/edit/${workoutId}`);
    };

    const handleRemoveAction = () => {
        dispatch(deleteWorkout(workoutId));
    };

    const handlePlayButtonClicked = () => {
        history.push(`/workout/${workoutId}`);
    };

    return (
        <>
            <SwipeListElement
                leftElement={{
                    content: editAction,
                    handler: handleEditAction,
                }}
                rightElement={{
                    content: removeAction,
                    handler: handleRemoveAction,
                }}
            >
                <div className="workout-list-element">
                    <h3 className="workout-list-element__title">{workoutName}</h3>
                    <div className="workout-list-element__inner-group">
                        <span className="workout-list-element__duration">
                            {formatSecondsToMinutesLeftRounded(workoutDuration || 0)} min
                        </span>
                        <Button handleClick={handlePlayButtonClicked} variant="play">
                            <IconPlay className="workout-list-element__icon" />
                        </Button>
                    </div>
                </div>
            </SwipeListElement>
        </>
    );
};

export default WorkoutListElement;
