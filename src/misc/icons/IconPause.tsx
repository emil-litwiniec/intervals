import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconPause: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-pause' }) => {
    return (
        <svg
            width="42"
            height="62"
            className={'icon ' + className}
            viewBox="0 0 42 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V58C14 60.2091 12.2091 62 10 62H4C1.79086 62 0 60.2091 0 58V4Z"
                fill={color}
            />
            <path
                d="M28 4C28 1.79086 29.7909 0 32 0H38C40.2091 0 42 1.79086 42 4V58C42 60.2091 40.2091 62 38 62H32C29.7909 62 28 60.2091 28 58V4Z"
                fill={color}
            />
        </svg>
    );
};

export default IconPause;
