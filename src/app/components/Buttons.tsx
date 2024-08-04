import React from 'react';

interface ButtonProps {
    caseStyle: string;
    singleFile: boolean;
    format: string;
    selectedCollections: string[];
}

const Buttons: React.FC<ButtonProps> = ({ caseStyle, singleFile, format, selectedCollections }) => {
    const handleExtract = () => {
        parent.postMessage({ 
            pluginMessage: { 
                type: 'extract-tokens',
                data: {
                    caseStyle,
                    singleFile,
                    format,
                    collections: selectedCollections
                }
            } }, '*');
    };

    const handleCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
    };

    const handleRefresh = () => {
        parent.postMessage({ pluginMessage: { type: 'refresh-collections' } }, '*');
    };

    return (
        <div id="buttons">
            <button onClick={handleExtract}>Extract Tokens</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    );
};

export default Buttons;
