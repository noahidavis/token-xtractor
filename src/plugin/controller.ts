import { ExtractTokensMessage, VariableCollection } from '../types/tokenTypes';
import { extractTokens, prepareFiles } from '../app/utils/tokenUtils';
import { createZip } from '../app/utils/zipUtils';


if (figma.editorType === 'figma') {
  figma.showUI(__html__, { width: 700, height: 700, themeColors: false });

  figma.ui.onmessage = async (msg: ExtractTokensMessage) => {
    try {
      if (msg.type === 'extract-tokens') {
        // ! Debug
        console.log('Controller received extract-tokens', msg.data);

        const { caseStyle, singleFile, format, collections, allCollections } = msg.data!;
        const tokens = await extractTokens(caseStyle, singleFile, collections, allCollections, format);
        const files = prepareFiles(tokens, singleFile, format, caseStyle);
        figma.ui.postMessage({ type: 'update-preview', files });



      } else if (msg.type === 'trigger-download') {
        const { caseStyle, singleFile, format, collections, allCollections } = msg.data!;
        const tokens = await extractTokens(caseStyle, singleFile, collections, allCollections, format);
        const files = prepareFiles(tokens, singleFile, format, caseStyle);
        const zipFile = await createZip(files);
        figma.ui.postMessage({ type: 'download-zip', zipFile });

      } else if (msg.type === 'cancel') {
        figma.closePlugin();
      } else if (msg.type === 'reset-collections') {
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
      variableIds: collection.variableIds,
      modes: collection.modes,
      defaultModeId: collection.defaultModeId,
    }))
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
