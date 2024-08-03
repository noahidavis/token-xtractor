const downloadZip = (zipFile: Blob) => {
    const url = URL.createObjectURL(zipFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'token-x-tractor-exports.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  export default downloadZip;
  