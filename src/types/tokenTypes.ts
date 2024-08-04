export interface ExtractTokensMessage {
    type: 'extract-tokens' | 'trigger-download' | 'cancel' | 'refresh-collections';
    data?: {
        caseStyle: CaseStyle;
        singleFile: boolean;
        format: ExportFormat;
        collections: string[];
    };
}

export interface VariableToken {
    name: string;
    value: string | number;
    collection: string;
}

export interface FileContent {
    name: string;
    content: string;
}

export type CaseStyle = 'kebab' | 'camel' | 'snake';
export type ExportFormat = 'json' | 'css';
export type VariableResolvedDataType = 'BOOLEAN' | 'COLOR' | 'FLOAT' | 'STRING';
export type VariableValue = boolean | string | number | RGB | RGBA | VariableAlias;

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface VariableAlias {
    type: 'VARIABLE_ALIAS';
    id: string;
}

export interface VariableCollection {
    id: string;
    name: string;
    variableIds: string[];
}
