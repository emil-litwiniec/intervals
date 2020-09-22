import React, { RefObject, useRef } from 'react';
import './_startWorkout.scss';
import { useHistory } from 'react-router-dom';
import ExpandButton from '@/components/button/ExpandButton';

const StartWorkout: React.FC = () => {
    const history = useHistory();

    const handleButtonClicked = () => {
        history.push('create');
    };
    
    return (
        <section className="start-workout">
            <ExpandButton handleClick={handleButtonClicked} variant="start-workout">
                <div>Start new workout</div>
            </ExpandButton>
        </section>
    );
};

export default StartWorkout;
