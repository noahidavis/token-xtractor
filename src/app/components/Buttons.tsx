import React from 'react';
import { 
  selectedCollectionsAtom,
  caseStyleAtom,
  allCollectionsAtom,
  singleFileAtom,
  exportFormatAtom
} from '../../jotai/atoms';
import { useAtomValue } from 'jotai';
import CustomButton from './CustomButton';
import { Flex } from '@radix-ui/themes';


const Buttons: React.FC = () => {
  const selectedCollections = useAtomValue(selectedCollectionsAtom);
  const allCollections = useAtomValue(allCollectionsAtom);
  const caseStyle = useAtomValue(caseStyleAtom);
  const singleFile = useAtomValue(singleFileAtom);
  const format = useAtomValue(exportFormatAtom);

  const handleTriggerDownload = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'trigger-download',
        data: {
          caseStyle,
          singleFile,
          format,
          collections: selectedCollections,
          allCollections: allCollections
        },
      },
    }, '*');
  };

  const handleCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  const handleRefreshCollections = () => {
    parent.postMessage({ pluginMessage: { type: 'refresh-collections' } }, '*');
  };

  return (
    <div id='buttons-container'>
      <Flex direction='column' gap='2'>
        <CustomButton onClick={handleTriggerDownload} text={'DOWNLOAD TOKENS'}/>
        <CustomButton onClick={handleCancel} text={'CANCEL'} color='gray' variant='soft' />
        <CustomButton onClick={handleRefreshCollections} text={'REFRESH'} color='gray' variant='surface' />      
      </Flex>
    </div>
  );
};

export default Buttons;
