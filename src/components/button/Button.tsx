import React, { SyntheticEvent } from 'react';
import './_button.scss';

export type ButtonProps = {
    handleClick(event: SyntheticEvent): void;
    variant?: string;
    buttonRef?: any;
};

const Button: React.FC<ButtonProps> = ({ handleClick, variant = 'default', children, buttonRef }) => {
    return (
        <button className={`button button--${variant}`} onClick={handleClick} ref={buttonRef}>
            <div className="button__container">{children}</div>
        </button>
    );
};

export default Button;
