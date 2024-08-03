const initializePlugin = (caseStyle: string, singleFile: boolean, format: string, collections: string[]) => {
    const selectedCollections = collections.join(',');
    parent.postMessage({
      pluginMessage: {
        type: 'extract-tokens',
        data: { caseStyle, singleFile, format, collections: selectedCollections },
      },
    }, '*');
  };
  
  export default initializePlugin;
  