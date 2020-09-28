import { current } from '@reduxjs/toolkit';
import React, { FormEvent, SyntheticEvent, useRef, useState, useEffect, RefObject } from 'react';
import './_textInput.scss';

interface TextInputProps {
    value: string;
    onTextInputUpdate(value: string): void;
    onFocusChange?(isFocused: boolean): void;
    classNameVariant?: string;
    label?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onTextInputUpdate,
    classNameVariant,
    label,
    ...props
}) => {
    const [currentValue, setCurrentValue] = useState(value);
    const formInputRef: RefObject<HTMLInputElement> = useRef(null);

    const onValueChange = (e: SyntheticEvent<EventTarget>) => {
        const inputValue = (e.target as HTMLInputElement).value;
        setCurrentValue(inputValue);
    };

    const onSubmit = (e?: FormEvent) => {
        e && e.preventDefault();
        formInputRef.current?.blur();

        onTextInputUpdate(currentValue);
    };

    const onFocus = () => {
        if (!props.onFocusChange) return;
        props.onFocusChange(true);
    };

    const onBlur = () => {
        if (!props.onFocusChange) return;
        onSubmit();

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

    const classVariant = classNameVariant ? `text-input--${classNameVariant}` : '';

    return (
        <form onSubmit={onSubmit} className={`text-input ${classVariant}`}>
            {label && <label htmlFor="textInput">{label}</label>}
            <input
                type="text"
                value={currentValue}
                onChange={onValueChange}
                ref={formInputRef}
                name="textInput"
            />
            <button type="submit"></button>
        </form>
    );
};

export default TextInput;
