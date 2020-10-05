import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMuttedSelector, setMute } from '@/store/slices/settings';
import Button from './Button';
import { IconSoundOn, IconSoundOff } from '@/misc/icons';

type ToggleSoundButtonProps = {
    className?: string;
};

const ToggleSoundButton: React.FC<ToggleSoundButtonProps> = ({ className = '' }) => {
    const dispatch = useDispatch();
    const isMutted: any = useSelector<any>(isMuttedSelector);

    return isMutted ? (
        <Button
            additionalClassName={className}
            variant="toggle-sound"
            handleClick={() => dispatch(setMute(false))}
        >
            <IconSoundOn />
        </Button>
    ) : (
        <Button
            additionalClassName={className}
            variant="toggle-sound"
            handleClick={() => dispatch(setMute(true))}
        >
            <IconSoundOff />
        </Button>
    );
};

export default ToggleSoundButton;
