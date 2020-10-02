import React, { SyntheticEvent } from 'react';
import './_button.scss';

export type ButtonProps = {
    handleClick(event: SyntheticEvent): void;
    variant?: string;
    buttonRef?: any;
    additionalClassName?: string;
};

const Button: React.FC<ButtonProps> = ({
    handleClick,
    variant = 'default',
    additionalClassName = '',
    children,
    buttonRef,
}) => {
    return (
        <button
            className={`button button--${variant} ${additionalClassName}`}
            onClick={handleClick}
            ref={buttonRef}
        >
            <div className="button__container">{children}</div>
        </button>
    );
};

export default Button;
