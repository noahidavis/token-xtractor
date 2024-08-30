import React from 'react';
import { Flex, Badge } from '@radix-ui/themes';

const Header: React.FC = () => {
    const styles = {
        container: {
            margin: '8px 0px 4px 0px'
        },
        title: {        
            fontFamily: 'Bebas Neue',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 36,
        }

    };

    return (
        <Flex gap='4' direction='row' style={styles.container}>
        <div style={styles.title}>tokenXtractor</div>
        <Badge color='orange'>
            Beta
        </Badge>
        </Flex>
    )
};

export default Header;