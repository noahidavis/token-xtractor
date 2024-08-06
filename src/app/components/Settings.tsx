import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';
import CaseStyleSelector from './CaseStyleSelector';
import { singleFileAtom, exportFormatAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';
import { ExportFormat } from '../../types/tokenTypes';


const Settings: React.FC = () => {
    const [singleFile, setSingleFile] = useAtom(singleFileAtom);
    const [format, setFormat] = useAtom(exportFormatAtom);


    return (
        <div id="settings">
            <div>
                <CaseStyleSelector />
                <p>
                    <input type="checkbox" checked={singleFile} onChange={(e) => setSingleFile(e.target.checked)} /> Export in a single file
                </p>
                <p>Export Format:
                    <input type="radio" id="json" name="format" value="json" checked={format === 'json'} onChange={(e) => setFormat(e.target.value as ExportFormat)} />
                    <label htmlFor="json">JSON</label>
                    <input type="radio" id="css" name="format" value="css" checked={format === 'css'} onChange={(e) => setFormat(e.target.value as ExportFormat)} />
                    <label htmlFor="css">CSS</label>
                </p>
                <CollectionSelector />
            </div>
            <Buttons />
        </div>
    );
};

export default Settings;
