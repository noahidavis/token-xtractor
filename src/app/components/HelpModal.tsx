import React from 'react';
import HelpModalTabs from './HelpModalTabs';
import { Flex } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

interface HelpModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal: React.FC<HelpModalProps> = ({ showModal, setShowModal }) => {
    const styles = {
        title: {        
            fontFamily: 'Bebas Neue',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 44,
        }
    };

    return (
        <div id="help-modal" style={{ display: showModal ? 'flex' : 'none' }}>
            <div id="help-modal-content">
                <Flex direction='row' justify='between'>
                    <div style={styles.title}>Support</div>
                    <Cross2Icon id='help-modal-close' onClick={() => setShowModal(false)}/>
                </Flex>
                {/* <p className='normal-text'>Get the 411 on tokenXtractor.</p> */}
                <HelpModalTabs />
            </div>
        </div>
    );
};

export default HelpModal;
