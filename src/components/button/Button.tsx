import React, { SyntheticEvent } from 'react';
import './_button.scss';

export type ButtonProps = {
    handleClick(event: SyntheticEvent): void;
    variant?: string;
    buttonRef?: any;
    additionalClassName?: string;
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    handleClick,
    variant = 'default',
    additionalClassName = '',
    children,
    buttonRef,
    disabled = false
}) => {
    return (
        <button
            className={`button button--${variant} ${additionalClassName}`}
            onClick={handleClick}
            ref={buttonRef}
            disabled={disabled}
        >
            <div className="button__container">{children}</div>
        </button>
    );
};

export default Button;
