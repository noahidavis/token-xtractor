import React from 'react';
import CollectionSelector from './CollectionSelector';
import Buttons from './Buttons';
import ExportSingleFile from './ExportSingleFile';
import ExportFormatSelector from './ExportFormatSelector';
import { Flex } from '@radix-ui/themes';
import CaseStyleSelector from './CaseStyleSelector';

const Settings: React.FC = () => {


    return (
        // <Flex id="settings" direction='column' justify='between'>
        //     <Flex direction='column' gap='4'>
        //         <div style={{ fontFamily: 'Space Grotesk', fontSize: 16, fontWeight: 400 }}>Choose from the settings below:</div>
        //         <Flex direction='column' gap='4'>
        //             <CaseStyleSelector />
        //             <ExportSingleFile />
        //             <ExportFormatSelector />
        //             <CollectionSelector />
        //         </Flex>
        //     </Flex>
        //     <Buttons />
        // </Flex>
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
