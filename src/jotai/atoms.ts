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


