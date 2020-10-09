import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconPlus: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-plus' }) => {
    return (
        <svg
            width="78"
            height="78"
            viewBox="0 0 78 78"
            className={'icon ' + className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M70.7378 33.7768C72.8422 33.7768 74.5482 35.4828 74.5482 37.5872L74.5482 39.8734C74.5482 41.9779 72.8422 43.6839 70.7378 43.6839L6.72283 43.6839C4.6184 43.6839 2.91242 41.9779 2.91242 39.8734L2.91242 37.5872C2.91242 35.4828 4.6184 33.7768 6.72284 33.7768H70.7378Z"
                fill={color}
            />
            <path
                d="M43.5462 70.6001C43.5462 72.7045 41.8402 74.4105 39.7357 74.4105H37.4495C35.3451 74.4105 33.6391 72.7045 33.6391 70.6001L33.6391 6.58509C33.6391 4.48065 35.3451 2.77467 37.4495 2.77467L39.7357 2.77467C41.8402 2.77467 43.5462 4.48065 43.5462 6.58509L43.5462 70.6001Z"
                fill={color}
            />
        </svg>
    );
};

export default IconPlus;
