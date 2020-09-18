import React from 'react';
import SwipeListElement from '@/components/swipeListElement/SwipeListElement';

const WorkoutsList: React.FC = () => {
    const leftElement = <h5>Left element from props</h5>;
    const rightElement = <h5>Right element from props</h5>;
    return (
        <>
            <SwipeListElement
                leftElement={{
                    content: leftElement,
                    handler: () => {
                        console.log('Running callback LEFT');
                    },
                }}
                rightElement={{
                    content: rightElement,
                    handler: () => {
                        console.log('Running callback RIGHT');
                    },
                }}
            >
                <h3>Main element from children</h3>
            </SwipeListElement>
        </>
    );
};

export default WorkoutsList;
