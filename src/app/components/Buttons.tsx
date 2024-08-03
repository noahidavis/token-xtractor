import React from 'react';

const Buttons: React.FC = () => {
    const handleExtract = () => {
        parent.postMessage({ pluginMessage: { type: 'extract-tokens' } }, '*');
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
