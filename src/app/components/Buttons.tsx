import React from 'react';
import { 
  selectedCollectionsAtom,
  caseStyleAtom,
  // allCollectionsAtom
} from '../../jotai/atoms';
import { useAtomValue } from 'jotai';
// import useStore from '../zustand/useStore';

interface ButtonsProps {
  // caseStyle: string;
  singleFile: boolean;
  format: string;
  // selectedCollections: string[];
}

const Buttons: React.FC<ButtonsProps> = ({ 
  // caseStyle, 
  singleFile, 
  format, 
  // selectedCollections 
}) => {
  const selectedCollections = useAtomValue(selectedCollectionsAtom);
  const caseStyle = useAtomValue(caseStyleAtom);
  // const allCollections = useAtomValue(allCollectionsAtom);

  const handleTriggerDownload = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'trigger-download',
        data: {
          caseStyle,
          singleFile,
          format,
          collections: selectedCollections,
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
    <div className="buttons-container">
      {/* <button onClick={handleExtractTokens}>Extract Tokens</button> */}
      <button onClick={handleTriggerDownload}>Download Tokens</button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleRefreshCollections}>Refresh</button>
    </div>
  );
};

export default Buttons;
