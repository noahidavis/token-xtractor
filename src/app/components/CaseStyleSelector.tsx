import React from 'react';
import { derivedCaseStyleAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';
import { CaseStyle } from '../../types/tokenTypes';
import { Select, Flex } from '@radix-ui/themes';

const CaseStyleSelector: React.FC = () => {
    const [caseStyle, setCaseStyle] = useAtom(derivedCaseStyleAtom);

    const handleChange = (value: string) => {
        setCaseStyle(value as CaseStyle);
    };

    return (
        <Flex direction='row' gap='4' align={'center'}>
            <label>Case Style?</label>
            <Select.Root value={caseStyle} onValueChange={handleChange}>
                <Select.Trigger>{caseStyle}</Select.Trigger>
                <Select.Content>
                    <Select.Item value='kebab'>kebab</Select.Item>
                    <Select.Item value='camel'>camel</Select.Item>
                    <Select.Item value='snake'>snake</Select.Item>
                </Select.Content>
            </Select.Root>
        </Flex>
    );
};

export default CaseStyleSelector; 
