import { IconColorFill, IconEdit, IconSettings, IconPlus, IconPlay } from '@/misc/icons';
import React from 'react';
import './_editorHelp.scss';

const EditorHelp: React.FC = () => {
    return (
        <div className="editor-help">
            <h4>Tips</h4>
            <p>
                This is workout editor. Here you can set the shape of your workout. <br />
                Swipe to set duration for each interval and drag & drop to swap intervals within
                CORE.
                <br />
                <br />
                Use <IconEdit /> to set names for each exercise in a set. <br />
                Set color of each interval using <IconColorFill />, so later it will be easier for
                you to recognize current interval. <br />
                <br />
                You can set the name of the workout and its iterations using <IconSettings />
                in navigation bar. <br />
                Use <IconPlus /> to add another interval to your CORE (max 4). <br />
                <br />
                <IconPlay />
                will save and start your workout.
            </p>
        </div>
    );
};

export default EditorHelp;
