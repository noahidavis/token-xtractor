import React from 'react';
import { Tabs, Box, Text } from '@radix-ui/themes';

const HelpModalTabs: React.FC = () => {
    
    return (
        <Tabs.Root defaultValue="how-to-use">
            <Tabs.List>
                <Tabs.Trigger value="how-to-use">How-to-Use</Tabs.Trigger>
                <Tabs.Trigger value="support">Support</Tabs.Trigger>
                <Tabs.Trigger value="about">About</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="how-to-use">
                    <Text size="2">Learn about tokenXtractor and how to use it.</Text>
                </Tabs.Content>

                <Tabs.Content value="support">
                    <Text size="2">Get help, give help.</Text>
                </Tabs.Content>

                <Tabs.Content value="about">
                    <Text size="2">About the plugin, dev info, tips</Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    )
};

export default HelpModalTabs;