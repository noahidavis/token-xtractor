import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { allCollectionsAtom, selectedCollectionsAtom } from '../../jotai/atoms';
import { Button, Flex } from '@radix-ui/themes';
import { ReloadIcon } from '@radix-ui/react-icons';

const CollectionSelector: React.FC = () => {
    const allCollections = useAtomValue(allCollectionsAtom);
    const [selectedCollections, setSelectedCollections] = useAtom(selectedCollectionsAtom);

    useEffect(() => {
        // Automatically select all collections when the plugin loads
        if (allCollections) {
            setSelectedCollections(allCollections.map((collection) => collection.id));
        }
    }, [allCollections, setSelectedCollections]);

    const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.options;
        const selected: string[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedCollections(selected);
    };

    const handleRefreshCollections = () => {
        parent.postMessage({ pluginMessage: { type: 'refresh-collections' } }, '*');
    };

    return (
        <div className="collection-selector">
            <Flex direction='column' gap='2' style={{ marginBottom: 8 }}>
                <Flex direction='row' justify='between'>
                    <label htmlFor="collections" className='options-label'>Collections?</label>
                    <Button variant='ghost' color='gray' style={{ fontSize: 12, fontFamily: 'IBM Plex Mono', marginRight: 2 }} onClick={handleRefreshCollections}>
                        <ReloadIcon />
                        REFRESH
                    </Button>
                </Flex>
                <div style={{ fontFamily: 'Space Grotesk', fontStyle: 'italic', fontWeight: 400, fontSize: 12.64, color: 'slate' }}>All variable collections are selected by default. Choose below to override. Click 'REFRESH' to reset</div>
            </Flex>
            <select
                id="collections"
                className='options-content'
                multiple
                value={selectedCollections}
                onChange={handleSelection}
                style={{ display: 'block', width: '100%', height: '150px' }}
            >
                {allCollections == undefined ? (
                    <option disabled>Loading collections...</option>
                ) : (
                    allCollections.map((collection) => (
                        <option key={collection.id} value={collection.id}>
                            {collection.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default CollectionSelector;
