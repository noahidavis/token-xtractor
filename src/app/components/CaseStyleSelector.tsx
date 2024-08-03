import React from 'react';
import { CaseStyle } from '../../types/tokenTypes';

interface CaseStyleSelectorProps {
    caseStyle: CaseStyle;
    setCaseStyle: React.Dispatch<React.SetStateAction<CaseStyle>>;
}

const CaseStyleSelector: React.FC<CaseStyleSelectorProps> = ({ caseStyle, setCaseStyle }) => {
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
