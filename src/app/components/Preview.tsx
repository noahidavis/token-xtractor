import React from 'react';
import { useAtomValue } from 'jotai';
import { allCollectionsAtom, caseStyleAtom, exportFormatAtom, selectedCollectionsAtom, singleFileAtom } from '../../jotai/atoms';
import { Flex, Select } from '@radix-ui/themes';

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
        return name.replace('token-x-tractor-exports/', '');
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

    const handleSelectChange = (value: string) => {
        setActiveTab(value);
    };

    return (
        <div id="preview">
            <Flex direction="row" gap="4" align="center" id="preview-switch">
                <label className="options-label">Previewing</label>
                <Select.Root value={files.length > 0 ? activeTab : "none"} onValueChange={handleSelectChange}>
                    <Select.Trigger className="options-content" disabled={files.length === 0}>
                        {files.length > 0 ? getTabDisplayName(activeTab) : "none"}
                    </Select.Trigger>
                    {files.length > 0 && (
                        <Select.Content className="options-content">
                            {files.map(file => (
                                <Select.Item key={file.name} value={file.name}>
                                    {getTabDisplayName(file.name)}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    )}
                </Select.Root>
            </Flex>
            <Flex id="tokens-container">
                {files.map(file => (
                    <div
                        key={file.name}
                        className={`options-content tokens ${file.name === activeTab ? 'active' : ''}`}
                    >
                        {file.content}
                    </div>
                ))}
            </Flex>
        </div>
    );
};

export default Preview;
