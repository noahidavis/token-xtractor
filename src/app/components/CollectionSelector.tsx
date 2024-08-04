import React, { useEffect, useState } from 'react';

interface Collection {
    id: string;
    name: string;
}

interface CollectionSelectorProps {
    collections: Collection[];
    selectedCollections: string[];
    setSelectedCollections: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({
    collections,
    selectedCollections,
    setSelectedCollections,
}) => {
    const [allSelected, setAllSelected] = useState<boolean>(false);

    useEffect(() => {
        if (allSelected) {
            setSelectedCollections(collections.map((collection) => collection.id));
        } else {
            setSelectedCollections([]);
        }
    }, [allSelected, collections, setSelectedCollections]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                onChange={handleChange}
            >
                <option value="all" onClick={handleAllChange}>
                    {allSelected ? "Deselect All" : "Select All"}
                </option>
                {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                        {collection.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CollectionSelector;
