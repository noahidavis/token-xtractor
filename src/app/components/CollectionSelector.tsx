import React from 'react';

interface Collection {
    id: string;
    name: string;
}

interface CollectionSelectorProps {
    collections: Collection[];
    selectedCollections: string[];
    setSelectedCollections: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollectionSelector: React.FC<CollectionSelectorProps> = ({ collections, selectedCollections, setSelectedCollections }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCollections(selectedOptions);
    };

    return (
        <div>
            <label htmlFor="collections">Select Collections:</label>
            <select
                id="collections"
                multiple
                size={5}
                value={selectedCollections}
                onChange={handleChange}
            >
                <option value="all" selected>All</option>
                {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                        {collection.name}
                    </option>
                ))}
            </select>
            <div id="instructions">Hold Ctrl (or Cmd) and click to select multiple collections, or use Shift to select a range.</div>
        </div>
    );
};

export default CollectionSelector;
