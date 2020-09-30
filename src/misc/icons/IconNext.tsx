import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconNext: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-next' }) => {
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
                d="M52.5 26.6699C55.8333 28.5944 55.8333 33.4056 52.5 35.3301L7.5 61.3109C4.16667 63.2354 -1.68245e-07 60.8298 0 56.9808L2.27131e-06 5.01924C2.43956e-06 1.17024 4.16667 -1.23539 7.5 0.689107L52.5 26.6699Z"
                fill={color}
            />
            <path
                d="M60 4C60 1.79086 61.7909 0 64 0H70C72.2091 0 74 1.79086 74 4V58C74 60.2091 72.2091 62 70 62H64C61.7909 62 60 60.2091 60 58V4Z"
                fill={color}
            />
        </svg>
    );
};

export default IconNext;
