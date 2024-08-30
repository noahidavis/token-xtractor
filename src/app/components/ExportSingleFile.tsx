import React from 'react';
import { useAtom } from 'jotai';
import { singleFileAtom } from '../../jotai/atoms';
import { Switch, Flex } from '@radix-ui/themes';

const ExportSingleFile: React.FC = () => {
    const [singleFile, setSingleFile] = useAtom(singleFileAtom)

    const handleSwitchToggle = () => {
        setSingleFile(!singleFile)
    };

    return (
        <Flex gap='4' direction='row'>
            <label>
                Export Single File?
            </label>
            <Switch checked={singleFile} onCheckedChange={handleSwitchToggle}/>
        </Flex>
    )
};

export default ExportSingleFile;