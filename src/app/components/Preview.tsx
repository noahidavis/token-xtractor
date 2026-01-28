import React from 'react';
import { useAtomValue } from 'jotai';
import {
    allCollectionsAtom,
    caseStyleAtom,
    exportFormatAtom,
    selectedCollectionsAtom,
    singleFileAtom,
} from '../../jotai/atoms';
import { Flex, Select } from '@radix-ui/themes';
import type { VariableCollection } from '../../types/tokenTypes';

interface PreviewProps {
    files: { name: string; content: string }[];
}

function buildAllSelections(allCollections: VariableCollection[] | undefined) {
    if (!allCollections) return [];

    const selections: string[] = [];

    for (const c of allCollections) {
        const modes = c.modes ?? [];
        if (modes.length === 0) {
            selections.push(`${c.id}::${c.defaultModeId || '__all__'}`);
            continue;
        }
        if (modes.length === 1) {
            selections.push(`${c.id}::${modes[0].modeId}`);
            continue;
        }
        for (const m of modes) selections.push(`${c.id}::${m.modeId}`);
    }

    return selections;
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
    const [activeTab, setActiveTab] = React.useState<string>(files.length > 0 ? files[0].name : '');

    const selectedCollections = useAtomValue(selectedCollectionsAtom) as string[] | undefined;
    const allCollections = useAtomValue(allCollectionsAtom) as VariableCollection[] | undefined;

    const singleFile = useAtomValue(singleFileAtom);
    const exportFormat = useAtomValue(exportFormatAtom);
    const caseStyle = useAtomValue(caseStyleAtom);

    React.useEffect(() => {
        if (files.length > 0) setActiveTab(files[0].name);
    }, [files]);


    const getTabDisplayName = (name: string) => name.replace('token-x-tractor-exports/', '');

    React.useEffect(() => {
        // ! Debug
        console.log(`Preview useEffect triggered`, { allCollections, selectedCollections });

        if (!allCollections) return;

        const allSelections = buildAllSelections(allCollections);

        // If user hasn't selected anything yet, default to "all mode selections"
        const selectionsToPreview =
            selectedCollections && selectedCollections.length > 0 ? selectedCollections : allSelections;

        parent.postMessage(
            {
                pluginMessage: {
                    type: 'extract-tokens',
                    data: {
                        caseStyle,
                        singleFile,
                        format: exportFormat,
                        collections: selectionsToPreview,
                        allCollections,
                    },
                },
            },
            '*'
        );
    }, [caseStyle, exportFormat, singleFile, allCollections, selectedCollections]);

    const handleSelectChange = (value: string) => setActiveTab(value);

    return (
        <div id="preview">
            <Flex direction="row" gap="4" align="center" id="preview-switch">
                <label className="options-label">Previewing</label>

                <Select.Root value={files.length > 0 ? activeTab : 'none'} onValueChange={handleSelectChange}>
                    <Select.Trigger className="options-content" disabled={files.length === 0}>
                        {files.length > 0 ? getTabDisplayName(activeTab) : 'none'}
                    </Select.Trigger>

                    {files.length > 0 && (
                        <Select.Content className="options-content">
                            {files.map((file) => (
                                <Select.Item key={file.name} value={file.name}>
                                    {getTabDisplayName(file.name)}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    )}
                </Select.Root>
            </Flex>

            <Flex id="tokens-container">
                {files.map((file) => (
                    <div key={file.name} className={`options-content tokens ${file.name === activeTab ? 'active' : ''}`}>
                        {file.content}
                    </div>
                ))}
            </Flex>
        </div>
    );
};

export default Preview;
