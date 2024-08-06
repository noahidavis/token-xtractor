import React from 'react';
import { derivedCaseStyleAtom } from '../../jotai/atoms';
import { useAtom } from 'jotai';
import { CaseStyle } from '../../types/tokenTypes';


const CaseStyleSelector: React.FC = () => {
    const [caseStyle, setCaseStyle] = useAtom(derivedCaseStyleAtom);

    return (
        <div>
            <label>Case Style:</label>
            <select value={caseStyle} onChange={e => setCaseStyle(e.target.value as CaseStyle)}>
                <option value="kebab">Kebab</option>
                <option value="camel">Camel</option>
                <option value="snake">Snake</option>
            </select>
        </div>
    );
};

export default CaseStyleSelector;
