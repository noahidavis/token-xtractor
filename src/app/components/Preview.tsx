import React from 'react';
import { useAtomValue } from 'jotai';
import { allCollectionsAtom, caseStyleAtom, exportFormatAtom, selectedCollectionsAtom, singleFileAtom } from '../../jotai/atoms';

interface PreviewProps {
    files: { name: string; content: string }[];
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
    const [activeTab, setActiveTab] = React.useState<string>(files.length > 0 ? files[0].name : '');
    const selectedCollectionsIds = useAtomValue(selectedCollectionsAtom);
    const allCollections = useAtomValue(allCollectionsAtom);
    const singleFile = useAtomValue(singleFileAtom);
    const exportFormat = useAtomValue(exportFormatAtom);
    const caseStyle = useAtomValue(caseStyleAtom);



    React.useEffect(() => {
        if (files.length > 0) {
            setActiveTab(files[0].name);
        }
    }, [files]);

    const getTabDisplayName = (name: string) => {
        return name.replace('token-x-tractor-exports/', '')
    };


    React.useEffect(() => {
        const collectionIdsToPreview = selectedCollectionsIds?.length ? selectedCollectionsIds : allCollections?.map(c => c.id);
        console.log("Collections to send to controller.ts for preview: ", collectionIdsToPreview);

        parent.postMessage({
            pluginMessage: {
                type: 'extract-tokens',
                data: {
                    caseStyle,
                    singleFile,
                    format: exportFormat,
                    collections: collectionIdsToPreview,
                    allCollections: allCollections
                }
            }
        }, '*');
    }, [caseStyle, exportFormat, singleFile, allCollections, selectedCollectionsIds]);

    return (
        <div id="preview">
            <div id="tabs">
                {files.map(file => (
                    <div
                        key={file.name}
                        className={`tab ${file.name === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(file.name)}
                    >
                        {getTabDisplayName(file.name)}
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
