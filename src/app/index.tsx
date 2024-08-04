import React from 'react';
import { createRoot } from 'react-dom/client';
import Settings from './components/Settings';
import Preview from './components/Preview';
import HelpButton from './components/HelpButton';
import HelpModal from './components/HelpModal';
import { downloadZip } from './utils/zipUtils';
import './styles/index.css';

const App: React.FC = () => {
    const [caseStyle, setCaseStyle] = React.useState<string>('kebab');
    const [singleFile, setSingleFile] = React.useState<boolean>(false);
    const [format, setFormat] = React.useState<string>('json');
    const [collections, setCollections] = React.useState<{ id: string, name: string }[]>([]);
    const [selectedCollections, setSelectedCollections] = React.useState<string[]>([]);
    const [files, setFiles] = React.useState<{ name: string; content: string }[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.onmessage = (event) => {
            const { type, collections, files, zipFile } = event.data.pluginMessage || {};
            if (type === 'update-preview' && files) {
                setFiles(files);
            } else if (type === 'load-collections' && collections) {
                setCollections(collections);
            } else if (type == 'download-zip' && zipFile) {
                const zipFileArray = new Uint8Array(zipFile)
                downloadZip(zipFileArray, 'exports.zip');
            }
        };
    }, []);


    return (
        <div id="container">
            <div id="left-pane">
                <h2 id="plugin-title">tokenXtractor v2</h2>
                <Settings
                    caseStyle={caseStyle}
                    setCaseStyle={setCaseStyle}
                    singleFile={singleFile}
                    setSingleFile={setSingleFile}
                    format={format}
                    setFormat={setFormat}
                    collections={collections}
                    selectedCollections={selectedCollections}
                    setSelectedCollections={setSelectedCollections}
                />
            </div>
            <div id="right-pane">
                <Preview files={files} />
            </div>
            <HelpButton onClick={() => setShowModal(true)} />
            <HelpModal showModal={showModal} setShowModal={setShowModal} />
            <a id="download-link" style={{display: 'none'}}></a>
        </div>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    const entryPoint = document.getElementById('react-entry-point');
    if (entryPoint) {
        const root = createRoot(entryPoint);
        root.render(<App />);
    }
});
