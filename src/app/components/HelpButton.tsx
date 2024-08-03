import React from 'react';

interface HelpButtonProps {
    onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
    return (
        <div id="help-button" onClick={onClick}>
            ?
        </div>
    );
};

export default HelpButton;
