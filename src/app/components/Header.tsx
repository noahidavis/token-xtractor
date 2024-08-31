import React from 'react';
import { Flex, Badge } from '@radix-ui/themes';

const Header: React.FC = () => {
    const styles = {
        container: {
            margin: '12px 0px 4px 0px',
            borderBottom: '1px solid #ddd',

        },
        title: {        
            fontFamily: 'Bebas Neue',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 44,
        }

    };

    return (
        <Flex gap='4' direction='row' style={styles.container}>
        <div style={styles.title}>tokenXtractor</div>
        <Badge color='orange'>
            BETA
        </Badge>
        </Flex>
    )
};

export default Header;