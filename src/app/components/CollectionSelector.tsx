import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { allCollectionsAtom, selectedCollectionsAtom } from '../../jotai/atoms';

const CollectionSelector: React.FC = () => {
    const [allCollections] = useAtom(allCollectionsAtom);
    const [selectedCollections, setSelectedCollections] = useAtom(selectedCollectionsAtom);
    const [allSelected, setAllSelected] = useState<boolean>(false);

    useEffect(() => {
        if (allSelected && allCollections) {
            setSelectedCollections(allCollections.map((collection) => collection.id));
        } else {
            setSelectedCollections([]);
        }
    }, [allSelected, allCollections, setSelectedCollections]);

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

    const handleAllChange = () => {
        setAllSelected(!allSelected);
    };

    return (
        <div className="collection-selector">
            <label htmlFor="collections">Collections:</label>
            <select
                id="collections"
                multiple
                value={selectedCollections}
                onChange={handleSelection}
                style={{ display: 'block', width: '100%', height: '150px' }}
            >
                <option value="all" onClick={handleAllChange}>
                    {allSelected ? "Deselect All" : "Select All"}
                </option>
                {allCollections == undefined? (
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
