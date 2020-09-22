import React, { RefObject, SyntheticEvent, useRef } from 'react';
import Button, { ButtonProps } from '@/components/button/Button';

type ExpandButtonProps = ButtonProps & {
    delay?: number;
    expandColor?: string;
};

const ExpandButton: React.FC<ExpandButtonProps> = ({
    variant,
    handleClick,
    delay = 1000,
    expandColor = '#f3f3f3',
    children,
}) => {
    const buttonRef: RefObject<HTMLButtonElement> = useRef(null);

    const handleButtonClicked = (event: SyntheticEvent) => {
        const buttonElement = buttonRef.current;

        buttonElement?.classList.add('expand');
        buttonElement?.setAttribute('style', `--expand-color: ${expandColor};`);

        setTimeout(() => {
            handleClick(event);
            buttonElement?.classList.remove('expand');
            buttonElement?.removeAttribute('style');
        }, delay);
    };

    return (
        <Button handleClick={handleButtonClicked} variant={variant} buttonRef={buttonRef}>
            {children}
        </Button>
    );
};

export default ExpandButton;
