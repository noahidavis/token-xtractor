import { atom } from "jotai";
import { 
    CaseStyle,
    ExportFormat 
} from "../types/tokenTypes";

export const caseStyleAtom = atom<CaseStyle>('kebab');

export const singleFileAtom = atom<boolean>(false);

export const exportFormatAtom = atom<ExportFormat>('json');
