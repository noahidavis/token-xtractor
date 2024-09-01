import React from 'react';
import { Tabs, Box, Text, Flex, Code, ScrollArea } from '@radix-ui/themes';

const HelpModalTabs: React.FC = () => {
    
    return (
        <Tabs.Root defaultValue="quick-start" style={{ height: '100%' }}>
            <Tabs.List className='segmented-tab-label'>
                <Tabs.Trigger value="quick-start">QUICK START</Tabs.Trigger>
                <Tabs.Trigger value="support">SUPPORT</Tabs.Trigger>
                <Tabs.Trigger value="about">ABOUT</Tabs.Trigger>
            </Tabs.List>
            <ScrollArea type='always' scrollbars='vertical' style={{ height: '80%' }}>
                <Box className='normal-text' pt="3" pr='6'>
                    <Tabs.Content  value="quick-start">
                        {/* Content Wrapper */}
                        <Flex direction='column' gap='4'>
                            {/* Intro */}
                            <Text size='2'>tokenXtractor is a Figma plugin thoughtfully crafted to make exporting local variables, or tokens, easy and accessible. Its usage is fairly straightforward: configure your options, select your collections, and then download them.</Text>
                            {/* Configure options content */}
                            <Flex direction='column' gap='3'>
                                <Text className='options-label' size='3'>
                                    1) Configure your options
                                </Text>
                                <Text size='2'>
                                    <ul>
                                        <li className='options-label'>Case Style</li>
                                        <li className='options-label'>Export Single File</li>
                                        <li className='options-label'>Export Format</li>
                                    </ul>
                                </Text>
                            </Flex>
                            {/* Select collections content */}
                            <Flex direction='column' gap='3'>
                                <Text className='options-label' size='3'>
                                    2) Select your collections
                                </Text>
                                <Flex direction='column' gap='2'>
                                    <Text size='2'>
                                        All collections are selected by default, so if you would like to export all your collections, you can skip this step. Otherwise, click on the variable collection name to select / deselect it for export.
                                    </Text>
                                    <Text size='2'>
                                        You can select multiple using <Code>CMD + Click</Code> (MacOS) or <Code>CTRL + Click</Code> (Windows). To select a range, click the first collection and then <Code>SHIFT + Click</Code> the last collection.
                                    </Text>
                                    <Text size='2'>
                                        You can undo your selection by clicking the 'RESET' button next to 'Collections?'
                                    </Text>
                                </Flex>
                            </Flex>
                            {/* Download tokens content */}
                            <Flex direction='column' gap='3'>
                                <Text className='options-label' size='3'>3) Download your tokens</Text>
                                <Flex direction='column' gap='2'>
                                    <Text size='2'>
                                        Finally, press the 'DOWNLOAD TOKENS' button, save the zip file where you'd like, and then unzip the file to access your exported tokens.
                                    </Text>
                                </Flex>
                            </Flex>
                            {/* Previewing + extra content */}
                            <Flex direction='column' gap='3'>
                                <Text className='options-label' size='3'>Previewing + Misc. Tips</Text>
                                <Flex direction='column' gap='2'>
                                    <Text size='2'>
                                        The right half of the plugin contains a 'preview' of the tokens to be exported. When exporting multiple files, you can use the dropdown menu next to 'Previewing' to switch the collection you're viewing. (Copy to clipboard coming soon)
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="support">
                        <Text size="2">Get help, give help.</Text>
                    </Tabs.Content>

                    <Tabs.Content value="about">
                        <Text size="2">About the plugin, dev info, tips</Text>
                    </Tabs.Content>
                </Box>
            </ScrollArea>
        </Tabs.Root>
    )
};

export default HelpModalTabs;