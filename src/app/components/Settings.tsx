import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';
import ExportSingleFile from './ExportSingleFile';
import ExportFormatSelector from './ExportFormatSelector';
import { Flex } from '@radix-ui/themes';
import CaseStyleSelector from './CaseStyleSelector';

const Settings: React.FC = () => {


    return (
        <Flex id="settings" direction='column' justify='between'>
            <Flex direction='column' gap='6'>
                <CaseStyleSelector />
                <ExportSingleFile />
                <ExportFormatSelector />
                <CollectionSelector />
            </Flex>
            <Buttons />
        </Flex>
    );
};

export default Settings;
