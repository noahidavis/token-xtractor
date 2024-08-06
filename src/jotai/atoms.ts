import { atom } from "jotai";
import { 
    CaseStyle,
    ExportFormat,
    VariableCollection
} from "../types/tokenTypes";

export const caseStyleAtom = atom<CaseStyle>('kebab');

export const singleFileAtom = atom<boolean>(false);

export const exportFormatAtom = atom<ExportFormat>('json');

export const allCollectionsAtom = atom<VariableCollection[]>();

// ! Check types 
export const selectedCollectionsAtom = atom<string[]>();

// For updating caseStyle when exportFormat changes
export const derivedExportFormatAtom = atom(
    (get) => get(exportFormatAtom),
    (get, set, newFormat: ExportFormat) => {
        set(exportFormatAtom, newFormat);
        if (newFormat === 'css') {
            set(caseStyleAtom, 'kebab');
        }
    }
);

// for updating exportFormat when caseStyle changes
export const derivedCaseStyleAtom = atom(
    (get) => get(caseStyleAtom),
    (get, set, newStyle: CaseStyle) => {
        set(caseStyleAtom, newStyle);
        if (get(exportFormatAtom) === 'css' && newStyle !== 'kebab') {
            set(exportFormatAtom, 'json');
        }
    }
);


