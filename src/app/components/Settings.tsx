import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';
import CaseStyleSelector from './CaseStyleSelector';


interface SettingsProps {
    singleFile: boolean;
    setSingleFile: React.Dispatch<React.SetStateAction<boolean>>;
    format: string;
    setFormat: React.Dispatch<React.SetStateAction<string>>;
    // collections: { id: string; name: string }[];
}

const Settings: React.FC<SettingsProps> = ({
    singleFile,
    setSingleFile,
    format,
    setFormat,
    // collections,
}) => {
    return (
        <div id="settings">
            <div>
                <CaseStyleSelector />
                <p>
                    <input type="checkbox" checked={singleFile} onChange={(e) => setSingleFile(e.target.checked)} /> Export in a single file
                </p>
                <p>Export Format:
                    <input type="radio" id="json" name="format" value="json" checked={format === 'json'} onChange={(e) => setFormat(e.target.value)} />
                    <label htmlFor="json">JSON</label>
                    <input type="radio" id="css" name="format" value="css" checked={format === 'css'} onChange={(e) => setFormat(e.target.value)} />
                    <label htmlFor="css">CSS</label>
                </p>
                <CollectionSelector
                    // collections={collections}
                />
            </div>
            <Buttons 
                singleFile={singleFile} 
                format={format} 
            />
        </div>
    );
};

export default Settings;
