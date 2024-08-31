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

  return (
    <div id='buttons-container'>
      <Flex direction='column' gap='4'>
        <CustomButton onClick={handleTriggerDownload} text={'DOWNLOAD TOKENS'}/>
        <CustomButton onClick={handleCancel} text={'CLOSE'} color='gray' variant='soft' />    
      </Flex>
    </div>
  );
};

export default Buttons;
