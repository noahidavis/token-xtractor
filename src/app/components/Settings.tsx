import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';

interface SettingsProps {
    caseStyle: string;
    setCaseStyle: React.Dispatch<React.SetStateAction<string>>;
    singleFile: boolean;
    setSingleFile: React.Dispatch<React.SetStateAction<boolean>>;
    format: string;
    setFormat: React.Dispatch<React.SetStateAction<string>>;
    collections: { id: string; name: string }[];
    selectedCollections: string[];
    setSelectedCollections: React.Dispatch<React.SetStateAction<string[]>>;
}

const Settings: React.FC<SettingsProps> = ({
    caseStyle,
    setCaseStyle,
    singleFile,
    setSingleFile,
    format,
    setFormat,
    collections,
    selectedCollections,
    setSelectedCollections,
}) => {
    return (
        <div id="settings">
            <div>
                <p>Select Case Style:
                    <select value={caseStyle} onChange={(e) => setCaseStyle(e.target.value)}>
                        <option value="kebab">Kebab Case</option>
                        <option value="camel">Camel Case</option>
                        <option value="snake">Snake Case</option>
                    </select>
                </p>
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
                    collections={collections}
                    selectedCollections={selectedCollections}
                    setSelectedCollections={setSelectedCollections}
                />
            </div>
            <Buttons caseStyle={caseStyle} singleFile={singleFile} format={format} selectedCollections={selectedCollections} />
        </div>
    );
};

export default Settings;
