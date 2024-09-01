export interface ExtractTokensMessage {
    type: 'extract-tokens' | 'trigger-download' | 'cancel' | 'reset-collections';
    data?: {
        caseStyle: CaseStyle;
        singleFile: boolean;
        format: ExportFormat;
        collections: string[];
        allCollections: VariableCollection[];
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
    // defaultModeId: string;
    // hiddenFromPublishing: boolean;
    // key: string;
    // modes: Array<{
    //     modeId: string
    //     name: string
    //   }>; 
    name: string;
    // remote: boolean;
    variableIds: string[];
}
