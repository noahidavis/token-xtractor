import { ExtractTokensMessage, VariableCollection } from '../types/tokenTypes';
import { createZip, extractTokens, prepareFiles } from '../app/utils/tokenUtils';

if (figma.editorType === 'figma') {
    figma.showUI(__html__, { width: 700, height: 600 });

    figma.ui.onmessage = async (msg: ExtractTokensMessage) => {
        console.log('Message received in controller:', msg);
        try {
            if (msg.type === 'extract-tokens') {
                const { caseStyle, singleFile, format, collections } = msg.data || {};
                if (!caseStyle || !singleFile || !format || !collections) return;

                const tokens = await extractTokens(caseStyle, singleFile, collections, format);
                const files = prepareFiles(tokens, singleFile, format);
                figma.ui.postMessage({ type: 'update-preview', files });

            } else if (msg.type === 'trigger-download') {
                const { caseStyle, singleFile, format, collections } = msg.data || {};
                if (!caseStyle || !singleFile || !format || !collections) return;

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
        console.log('Plugin run triggered');
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
        // console.log('Collections loaded:', collections);
        figma.ui.postMessage({ type: 'load-collections', collections: collections.map(collection => ({ id: collection.id, name: collection.name })) });
    } catch (error) {
        console.error('Error loading collections:', error);
    }
}

async function loadCollectionsWithDelay() {
    setTimeout(async () => {
        await loadCollections();
    }, 500); // Delay of 500 milliseconds
}
