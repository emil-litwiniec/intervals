import React, { FormEvent, SyntheticEvent, useRef, useState, useEffect, RefObject } from 'react';
import './_input.scss';

type InputProps = {
    value: string | number;
    onInputUpdate(value: string | number): void;
    onFocusChange?(isFocused: boolean): void;
    classNameVariant?: string;
    label?: string;
    type?: string;
    step?: number;
};

const Input: React.FC<InputProps> = ({
    value,
    onInputUpdate,
    classNameVariant,
    label,
    type = 'text',
    step = 1,
    ...props
}) => {
    const [currentValue, setCurrentValue] = useState(value);
    const formInputRef: RefObject<HTMLInputElement> = useRef(null);

    const onValueChange = (e: SyntheticEvent<EventTarget>) => {
        const inputValue = (e.target as HTMLInputElement).value;
        const castToNumber = typeof currentValue === 'number';
        let newValue = castToNumber ? Number(inputValue) : inputValue;

        setCurrentValue(newValue);
    };

    const onSubmit = (e?: FormEvent) => {
        e && e.preventDefault();
        formInputRef.current?.blur();

        onInputUpdate(currentValue);
    };

    const onFocus = () => {
        if (!props.onFocusChange) return;
        props.onFocusChange(true);
    };

    const onBlur = () => {
        onSubmit();
        if (!props.onFocusChange) return;

        props.onFocusChange(false);
    };

    useEffect(() => {
        formInputRef?.current?.addEventListener('focus', onFocus);
        formInputRef?.current?.addEventListener('blur', onBlur);

        return () => {
            formInputRef?.current?.removeEventListener('focus', onFocus);
            formInputRef?.current?.removeEventListener('blur', onBlur);
        };
    });

    const classVariant = classNameVariant ? `input--${classNameVariant}` : '';
    const textInput = type === 'text' && (
        <div className="text-input input__wrapper">
            {label && <label htmlFor="textInput">{label}</label>}
            <input
                type="text"
                value={currentValue}
                onChange={onValueChange}
                ref={formInputRef}
                name="textInput"
                autoComplete="off"
            />
        </div>
    );

    const handleIncrement = () => {
        if (typeof currentValue !== 'number') return;
        setCurrentValue(currentValue + step);
    };

    const handleDecrement = () => {
        if (typeof currentValue !== 'number') return;
        setCurrentValue(currentValue - step);
    };

    const numberInput = type === 'number' && (
        <div className="input__wrapper">
            {label && <label htmlFor="numberInput">{label}</label>}
            <div className="number-input">
                <button
                    className="number-input__btn number-input__btn--decrement"
                    onClick={handleDecrement}
                >
                    -
                </button>
                <input
                    type="number"
                    value={currentValue}
                    min="1"
                    step={step}
                    onChange={onValueChange}
                    ref={formInputRef}
                    autoComplete="off"
                    name="numberInput"
                />
                <button
                    className="number-input__btn number-input__btn--increment"
                    onClick={handleIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );

    return (
        <form onSubmit={onSubmit} className={`input ${classVariant}`}>
            {textInput}
            {numberInput}
        </form>
    );
};

export default Input;
