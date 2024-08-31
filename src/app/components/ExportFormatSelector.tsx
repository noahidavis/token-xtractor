import React from 'react';
import { ExportFormat } from '../../types/tokenTypes';
import { derivedExportFormatAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';
import { SegmentedControl, Flex } from '@radix-ui/themes';


const ExportFormatSelector: React.FC = () => {
  const [format, setFormat] = useAtom(derivedExportFormatAtom);

  return (
    <Flex direction={'row'} gap='4' align='center'>
      <div className='options-label'>Export Format?</div>
      <SegmentedControl.Root value={format} onValueChange={(value) => setFormat(value as ExportFormat)} size='2'>
        <SegmentedControl.Item className='options-content' value='json'>JSON</SegmentedControl.Item>
        <SegmentedControl.Item className='options-content' value='css'>CSS</SegmentedControl.Item>
      </SegmentedControl.Root>
    </Flex>
  );
};

export default ExportFormatSelector;

