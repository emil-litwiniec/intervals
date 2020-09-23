import React from 'react';
import './_view.scss';

type Props = {
    variant?: string;
};

const View: React.FC<Props> = ({ variant = 'default', children }) => {
    return <div className={`view-wrapper view-wrapper--${variant}`}>{children}</div>;
};

export default View;
