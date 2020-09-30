import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconPrev: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-prev' }) => {
    return (
        <svg
            width="74"
            height="62"
            viewBox="0 0 74 62"
            fill="none"
            className={'icon ' + className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21.5 26.6699C18.1667 28.5944 18.1667 33.4056 21.5 35.3301L66.5 61.3109C69.8333 63.2354 74 60.8298 74 56.9808L74 5.01924C74 1.17024 69.8333 -1.23539 66.5 0.689107L21.5 26.6699Z"
                fill={color}
            />
            <path
                d="M14 4C14 1.79086 12.2091 0 10 0H4C1.79086 0 0 1.79086 0 4V58C0 60.2091 1.79086 62 4 62H10C12.2091 62 14 60.2091 14 58V4Z"
                fill={color}
            />
        </svg>
    );
};

export default IconPrev;
