import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconPlay: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-play' }) => {
    return (
        <svg
            className={'icon ' + className}
            width="55"
            height="62"
            viewBox="0 0 55 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M52.5 26.6699C55.8333 28.5944 55.8333 33.4056 52.5 35.3301L7.5 61.3109C4.16667 63.2354 -3.05236e-06 60.8298 -2.88411e-06 56.9808L-6.128e-07 5.01924C-4.44555e-07 1.17024 4.16667 -1.23539 7.5 0.689107L52.5 26.6699Z"
                fill={color}
            />
        </svg>
    );
};

export default IconPlay;
