import React from 'react';

type Props = {
    color?: string;
    className?: string;
};

const IconFill: React.FC<Props> = ({ color = '#f3f3f3', className = 'icon-color-fill' }) => {
    return (
        <svg
            width="107"
            height="112"
            viewBox="0 0 107 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={'icon ' + className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M67.433 15.6562L98.535 59.3301C101.739 63.8288 100.689 70.0728 96.1902 73.2765L47.7353 107.783C43.2366 110.987 36.9926 109.937 33.7889 105.438L2.68692 61.7645C-0.516774 57.2658 0.533025 51.0218 5.03171 47.8181L53.4866 13.3114C57.9853 10.1077 64.2293 11.1575 67.433 15.6562ZM60.9166 20.2968C60.2758 19.3971 59.027 19.1871 58.1273 19.8278L9.67235 54.3346C8.77262 54.9753 8.56266 56.2241 9.2034 57.1238L40.3054 100.798C40.9462 101.698 42.195 101.908 43.0947 101.267L91.5496 66.7601C92.4493 66.1193 92.6593 64.8705 92.0186 63.9708L60.9166 20.2968Z"
                fill={color}
            />
            <path
                d="M51.2529 6.97092C49.9592 5.18134 50.3612 2.68182 52.1507 1.38808C53.9403 0.0943474 56.4398 0.496308 57.7336 2.28589L69.8885 19.0993L63.4078 23.7843L51.2529 6.97092Z"
                fill={color}
            />
            <path d="M14 66H94.5L41.5 104.5L14 66Z" fill={color} />
            <path
                d="M91 103.9C91 99.4708 95.2701 92.1593 98.0791 86.8012C98.4638 86.0673 99.5362 86.0673 99.9209 86.8012C102.73 92.1593 107 99.4708 107 103.9C107 108.85 102 112 99 112C96 112 91 108.85 91 103.9Z"
                fill={color}
            />
        </svg>
    );
};

export default IconFill;
