import React from 'react';
import { 
  selectedCollectionsAtom,
  caseStyleAtom,
  allCollectionsAtom,
  singleFileAtom,
  exportFormatAtom
} from '../../jotai/atoms';
import { useAtomValue } from 'jotai';


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
    <div className="buttons-container">
      {/* <button onClick={handleExtractTokens}>Extract Tokens</button> */}
      <button onClick={handleTriggerDownload}>Download Tokens</button>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleRefreshCollections}>Refresh</button>
    </div>
  );
};

export default Buttons;
