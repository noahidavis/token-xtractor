import React from 'react';

interface HelpModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal: React.FC<HelpModalProps> = ({ showModal, setShowModal }) => {
    return (
        <div id="help-modal" style={{ display: showModal ? 'flex' : 'none' }}>
            <div id="help-modal-content">
                <span id="help-modal-close" onClick={() => setShowModal(false)}>
                    &times;
                </span>
                <h2>Help</h2>
                <p>This is the help modal content.</p>
            </div>
        </div>
    );
};

export default HelpModal;
