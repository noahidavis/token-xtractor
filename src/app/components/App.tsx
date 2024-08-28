import React from 'react';
import Settings from './Settings';
import Preview from './Preview';
import HelpButton from './HelpButton';
import HelpModal from './HelpModal';
import { downloadZip } from '../utils/zipUtils';
import '../styles/index.css'
import {  useSetAtom } from 'jotai';
// import myStore from '../../jotai/store';
import { allCollectionsAtom } from '../../jotai/atoms';


const App: React.FC = () => {
    // const [caseStyle, setCaseStyle] = React.useState<string>('kebab');
    // const [singleFile, setSingleFile] = React.useState<boolean>(false);
    // const [format, setFormat] = React.useState<string>('json');
    const setCollectionsAtom = useSetAtom(allCollectionsAtom);
    const [files, setFiles] = React.useState<{ name: string; content: string }[]>([]);
    const [showModal, setShowModal] = React.useState<boolean>(false);


    React.useEffect(() => {
        window.onmessage = (event) => {
            const { type, files, collections, zipFile } = event.data.pluginMessage || {};
            if (type === 'update-preview' && files) {
                setFiles(files);
            } else if (type == 'collections-loaded') {
                console.log("Collections from loadCollection(): ", collections);
                setCollectionsAtom(collections)
                // console.log("Zustand store allCollectionsAtom set: ", varCollections);
            } else if (type == 'download-zip' && zipFile) {
                const zipFileArray = new Uint8Array(zipFile)
                downloadZip(zipFileArray, 'exports.zip');
            }
        };
    }, []);


    return (
        <div id="container">
            <div id="left-pane">
                <h2 id="plugin-title">tokenXtractor</h2>
                <Settings
                    // caseStyle={caseStyle}
                    // setCaseStyle={setCaseStyle}
                    // singleFile={singleFile}
                    // setSingleFile={setSingleFile}
                    // format={format}
                    // setFormat={setFormat}
                    // collections={collections}
                    // selectedCollections={selectedCollections}
                    // setSelectedCollections={setSelectedCollections}
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


export default App;