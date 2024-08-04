import JSZip from 'jszip';
import { FileContent } from '../../types/tokenTypes';

export async function createZip(files: FileContent[]): Promise<Uint8Array> {
  const zip = new JSZip();
  const folder = zip.folder('token-x-tractor-exports')!;
  files.forEach(file => {
    folder.file(file.name.replace('token-x-tractor-exports/', ''), file.content);
  });
  const content = await zip.generateAsync({ type: 'uint8array' });
  return content;
}

export function downloadZip(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
