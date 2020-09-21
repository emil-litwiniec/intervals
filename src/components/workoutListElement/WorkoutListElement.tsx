import React, { ReactNode } from 'react';
import SwipeListElement from '@/components/swipeListElement/SwipeListElement';
import { useHistory } from 'react-router-dom';
import './_workoutListElement.scss';
import IconPlay from '@/misc/icons/IconPlay';
import IconEdit from '@/misc/icons/IconEdit';

interface ISideListElement {
    classNameVariant: string;
    textContent: string;
    icon: ReactNode;
}

export interface IWorkout {
    workoutId: number;
    workoutName: string;
    workoutDuration: number;
}

const WorkoutListElement: React.FC<IWorkout> = ({ workoutId, workoutName, workoutDuration }) => {
    const history = useHistory();

    const createSwipeListSideElement = ({
        classNameVariant,
        textContent,
        icon,
    }: ISideListElement) => {
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
        textContent: 'Edit Workout',
        icon: <IconEdit className="workout-list-side-element__icon" />,
    });

    const removeAction = createSwipeListSideElement({
        classNameVariant: 'right',
        textContent: 'Remove Workout',
        icon: <IconEdit className="workout-list-side-element__icon" />,
    });

    const handleEditAction = () => {
        history.push(`edit/${workoutId}`);
    };

    const handleRemoveAction = () => {};

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
                        <span className="workout-list-element__duration">{workoutDuration}</span>
                        <IconPlay className="workout-list-element__icon" />
                    </div>
                </div>
            </SwipeListElement>
        </>
    );
};

export default WorkoutListElement;
