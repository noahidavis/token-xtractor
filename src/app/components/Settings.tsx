import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';
import ExportSingleFile from './ExportSingleFile';
import ExportFormatSelector from './ExportFormatSelector';
import { Flex } from '@radix-ui/themes';
import CaseStyleSelector from './CaseStyleSelector';

const Settings: React.FC = () => {


    return (
        <div id="settings">
            <Flex direction='column' gap='4'>
                <CaseStyleSelector />
                <ExportSingleFile />
                <ExportFormatSelector />
                <CollectionSelector />
            </Flex>
            <Buttons />
        </div>
    );
};

export default Settings;
