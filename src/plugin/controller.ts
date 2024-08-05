import { ExtractTokensMessage, VariableCollection } from '../types/tokenTypes';
import { extractTokens, prepareFiles } from '../app/utils/tokenUtils';
import { createZip } from '../app/utils/zipUtils';
// Testing Jotai outside React
// import myStore from '../jotai/store';
// import * as Atoms from '../jotai/atoms'

// Testing Jotai Outside React
// const caseStyleState = myStore.get(atoms.caseStyleAtom);


if (figma.editorType === 'figma') {
  figma.showUI(__html__, { width: 700, height: 600 });

  figma.ui.onmessage = async (msg: ExtractTokensMessage) => {
    try {
      if (msg.type === 'extract-tokens') {
        const { caseStyle, singleFile, format, collections } = msg.data!;
        const tokens = await extractTokens(caseStyle, singleFile, collections, format);
        const files = prepareFiles(tokens, singleFile, format);
        figma.ui.postMessage({ type: 'update-preview', files });

      } else if (msg.type === 'trigger-download') {
        const { caseStyle, singleFile, format, collections } = msg.data!;
        const tokens = await extractTokens(caseStyle, singleFile, collections, format);
        const files = prepareFiles(tokens, singleFile, format);
        const zipFile = await createZip(files);
        figma.ui.postMessage({ type: 'download-zip', zipFile });

      } else if (msg.type === 'cancel') {
        figma.closePlugin();
      } else if (msg.type === 'refresh-collections') {
        await loadCollections();
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };

  figma.on('run', async () => {
    console.log('tokenXtractor started . . .');
    try {
      await loadCollectionsWithDelay();
      // Testing Jotai outside React
      // console.log("Jotai in controller.ts test: ", caseStyleState);
    } catch (error) {
      console.error('Error during initial loadCollections:', error);
    }
  });
}

async function loadCollections() {
  try {
    const collections: VariableCollection[] = await figma.variables.getLocalVariableCollectionsAsync();
    const serializedCollections = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      variableIds: collection.variableIds
    }))
    // myStore.set(Atoms.allCollectionsAtom, serializedCollections);
    // console.log("Collections in Jotai store: ", myStore.get(Atoms.allCollectionsAtom));
    figma.ui.postMessage({ type: 'collections-loaded', collections: serializedCollections });
  } catch (error) {
    console.error('Error loading collections:', error);
  }
}

async function loadCollectionsWithDelay() {
  setTimeout(async () => {
    await loadCollections();
  }, 500); // Delay of 500 milliseconds
}
