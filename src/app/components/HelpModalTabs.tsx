import React from 'react';
import { Tabs, Box, Text, Flex, Code, ScrollArea, Link, Strong} from '@radix-ui/themes';

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
                        <Flex direction='column' gap='3'>
                            <Text className='options-label' size='3'>Getting Started</Text>
                            {/* Intro */}
                            <Text size='2'>tokenXtractor is a Figma plugin thoughtfully crafted to make exporting local variables, or tokens, easy and accessible. Its usage is fairly straightforward: configure your options, select the variable modes you want to export (grouped by collection), and then download them.</Text>
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
                                    2) Select your collections + modes
                                </Text>
                                <Flex direction='column' gap='2'>
                                    <Text size='2'>
                                        All variable modes across all collections are selected by default, so if you would like to export everything, you can skip this step. The list is grouped by collection, and you can select or deselect specific modes for export.
                                    </Text>
                                    <Text size='2'>
                                        You can select multiple modes using <Code>CMD + Click</Code> (MacOS) or <Code>CTRL + Click</Code> (Windows). To select a range, click the first mode and then <Code>SHIFT + Click</Code> the last mode.
                                    </Text>
                                    <Text size='2'>
                                        Click the 'RESET' button next to 'Collections?' to restore the default selection (all variable modes across all collections).
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
                                        The right half of the plugin contains a 'preview' of the tokens to be exported. When exporting multiple files, you can use the dropdown menu next to 'Previewing' to switch the export file you're viewing. (Copy to clipboard coming soon)
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="support">
                        <Flex direction='column' gap='3'>
                            <Text className='options-label' size='3'>Get help, Give help!</Text>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    If you have questions, need guidance, want to report a bug, or have feature requests, please don't hesitate to reach out.
                                </Text>
                            </Flex>
                            <Text className='options-label' size='3'>📧 Contact Us</Text>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    Email us directly at: <Link href="mailto:help@techworks.studio">help@techworks.studio</Link>
                                </Text>
                            </Flex>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    Thank you for trusting TokenXtractor to streamline your workflow. We're here to grow with you!
                                </Text>
                            </Flex>
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value="about">
                        <Flex direction='column' gap='3'>
                            <Text className='options-label' size='3'>About techworks studio</Text>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    TokenXtractor is brought to you by <Strong>techworks studio</Strong>, a hybrid tech consultancy and R&D studio. At techworks, we create digital product solutions for bold ideas while simultaneously developing in-house tools that seek to innovate and push the boundaries of the way we work.
                                </Text>
                                <Text size='2'>
                                    TokenXtractor is just one of many tools in our mission to shape the future of tech through user-first design and cutting-edge solutions.
                                </Text>
                            </Flex>
                            <Text className='options-label' size='3'>What is TokenXtractor?</Text>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    TokenXtractor is a lightweight, intuitive plugin designed to help designers and developers streamline their workflows by extracting design tokens directly from your Figma projects and converting them into code-friendly objects and variables.
                                </Text>
                            </Flex>
                            <Text className='options-label' size='3'>Why TokenXtractor Exists?</Text>
                            <Flex direction='column' gap='2'>
                                <Text size='2'>
                                    Designing for scalability and consistency shouldn't be complicated. TokenXtractor empowers individuals and teams to focus on creativity instead of repetitive tasks. Whether you’re designing a simple web page or creating a whole design system, TokenXtractor simplifies the design-development handoff, saving you from the time-consuming task of manually converting local variables to code.
                                </Text>
                            </Flex>
                        </Flex>
                    </Tabs.Content>
                </Box>
            </ScrollArea>
        </Tabs.Root>
    )
};

export default HelpModalTabs;
