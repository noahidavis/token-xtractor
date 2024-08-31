import React from 'react';
import Settings from './Settings';
import Preview from './Preview';
import HelpModal from './HelpModal';
import { downloadZip } from '../utils/zipUtils';
import {  useSetAtom } from 'jotai';
import { allCollectionsAtom } from '../../jotai/atoms';
import Header from './Header';
import { Flex, IconButton } from '@radix-ui/themes';
import { QuestionMarkIcon } from '@radix-ui/react-icons';


const App: React.FC = () => {
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
            } else if (type == 'download-zip' && zipFile) {
                const zipFileArray = new Uint8Array(zipFile)
                downloadZip(zipFileArray, 'exports.zip');
            }
        };
    }, []);


    return (
        <div id="container">
            <Flex id="left-pane" direction='column' gap='4'>
                <Header />
                <Settings />
            </Flex>
            <div id="right-pane">
                <Preview files={files} />
            </div>
            <IconButton id='help-button' radius='full' onClick={() => setShowModal(true)} style={{ backgroundColor: 'black' }}>
                <QuestionMarkIcon style={{ color: 'white' }}/>
            </IconButton>
            <HelpModal showModal={showModal} setShowModal={setShowModal} />
            <a id="download-link" style={{display: 'none'}}></a>
        </div>
    );
};


export default App;