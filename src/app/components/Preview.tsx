import React from 'react';

interface PreviewProps {
    files: { name: string; content: string }[];
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
    const [activeTab, setActiveTab] = React.useState<string>(files.length > 0 ? files[0].name : '');

    React.useEffect(() => {
        if (files.length > 0) {
            setActiveTab(files[0].name);
        }
    }, [files]);

    return (
        <div id="preview">
            <div id="tabs">
                {files.map(file => (
                    <div
                        key={file.name}
                        className={`tab ${file.name === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(file.name)}
                    >
                        {file.name}
                    </div>
                ))}
            </div>
            <div id="tab-contents">
                {files.map(file => (
                    <div
                        key={file.name}
                        className={`tab-content ${file.name === activeTab ? 'active' : ''}`}
                    >
                        {file.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Preview;
