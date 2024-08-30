import React from 'react';
import { ExportFormat } from '../../types/tokenTypes';
import { derivedExportFormatAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';
import { SegmentedControl, Flex } from '@radix-ui/themes';


const ExportFormatSelector: React.FC = () => {
  const [format, setFormat] = useAtom(derivedExportFormatAtom);
  const styles = {
    title: {
      fontFamily: 'Space Grotesk',
      fontWeight: 500,
    },
    segmentedItems: {
      fontFamily: 'IBM Plex Mono'
    }
  }

  return (
    <Flex direction={'row'} gap='2' align='center'>
      <div style={styles.title}>Export Format?</div>
      <SegmentedControl.Root value={format} onValueChange={(value) => setFormat(value as ExportFormat)} size='2'>
        <SegmentedControl.Item style={styles.segmentedItems} value='json'>JSON</SegmentedControl.Item>
        <SegmentedControl.Item style={styles.segmentedItems} value='css'>CSS</SegmentedControl.Item>
      </SegmentedControl.Root>
    </Flex>
  );
};

export default ExportFormatSelector;

