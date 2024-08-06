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
    <div id="buttons-container">
      <button id="download-button" className="primary-button" onClick={handleTriggerDownload}>Download Tokens</button>
      <div id="secondary-buttons-container">
        <button id="cancel-button" className="secondary-button" onClick={handleCancel}>Cancel</button>
        <button id="refresh-button" className="secondary-button" onClick={handleRefreshCollections}>Refresh</button>
      </div>
    </div>
  );
};

export default Buttons;
