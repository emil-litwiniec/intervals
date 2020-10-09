import React, { CSSProperties, useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import './_subsectionTitlesEditor.scss';
import { v4 as uuidv4 } from 'uuid';

type SubsectionTilesEditorProps = {
    subsectionTitles: string[];
    coreIterations: number;
    onSubsectionTitlesUpdate(subsectionTitles: string[]): void;
    color: string;
    mainTitle: string;
};

const SubsectionTitlesEditor: React.FC<SubsectionTilesEditorProps> = ({
    subsectionTitles,
    coreIterations,
    color = 'cornflowerblue',
    onSubsectionTitlesUpdate,
    mainTitle,
}) => {
    const createTitlesArray = (): string[] => {
        const arr = new Array(coreIterations)
            .fill('')
            .map((el, index) => subsectionTitles[index] || '');

        return arr;
    };

    const [tempSubsectionTitles, setTempSubsectionTitles] = useState(createTitlesArray());

    const subsectionTitlesList = tempSubsectionTitles.map((el, index) => {
        const id = uuidv4();
        return (
            <li key={id}>
                <Input
                    label={`${index + 1}: `}
                    value={el}
                    classNameVariant="subsection-title"
                    onInputUpdate={(value: string) => {
                        handleInputUpdate(index, value);
                    }}
                />
            </li>
        );
    });

    useEffect(() => {
        onSubsectionTitlesUpdate(tempSubsectionTitles);
    }, [tempSubsectionTitles, onSubsectionTitlesUpdate]);

    const handleInputUpdate = (index: number, value: string) => {
        setTempSubsectionTitles(
            tempSubsectionTitles.map((title, titleIndex) => (index === titleIndex ? value : title))
        );
    };

    const containerStyle: CSSProperties = { backgroundColor: color };

    return (
        <div className="subsection-titles-editor workout-editor__modal" style={containerStyle}>
            <span className="subsection-titles-editor__main-title">{mainTitle}</span>
            <ul className="subsection-titles-editor__list">{subsectionTitlesList}</ul>
        </div>
    );
};

export default SubsectionTitlesEditor;
