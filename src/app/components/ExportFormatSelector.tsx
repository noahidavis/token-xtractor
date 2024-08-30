import React from 'react';
import { ExportFormat } from '../../types/tokenTypes';
import { derivedExportFormatAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';


const ExportFormatSelector: React.FC = () => {
  const [format, setFormat] = useAtom(derivedExportFormatAtom);

  return (
    <p>Export Format:
      <input type="radio" id="json" name="format" value="json" checked={format === 'json'} onChange={(e) => setFormat(e.target.value as ExportFormat)} />
      <label htmlFor="json">JSON</label>
      <input type="radio" id="css" name="format" value="css" checked={format === 'css'} onChange={(e) => setFormat(e.target.value as ExportFormat)} />
      <label htmlFor="css">CSS</label>
    </p>
  );
};

export default ExportFormatSelector;

