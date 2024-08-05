import { VariableToken, FileContent, CaseStyle, ExportFormat, VariableCollection } from '../../types/tokenTypes';
import { resolveValue, formatName, convertToCSSVariables, assignNestedValue } from './valueUtils';
import * as Atoms  from '../../jotai/atoms';
import myStore from '../../jotai/store';


export async function extractTokens(caseStyle: CaseStyle, singleFile: boolean, collections: string[], format: ExportFormat): Promise<VariableToken[]> {
    const allCollections = myStore.get(Atoms.allCollectionsAtom)!
    console.log("All collections pulled  by extractTokens(): ", allCollections);
    const selectedCollections = collections.indexOf('all') > -1 ? allCollections : allCollections.filter(collection => collections.indexOf(collection.id) > -1);
    let tokens: VariableToken[] = [];

    for (const collection of selectedCollections) {
        const collectionTokens = await processCollection(collection, caseStyle, format);
        tokens = tokens.concat(collectionTokens);
    }

    return tokens;
}

async function processCollection(collection: VariableCollection, caseStyle: CaseStyle, format: ExportFormat): Promise<VariableToken[]> {
    const tokens: VariableToken[] = [];
    const variableIds = collection.variableIds;

    for (const variableId of variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variableId);
        if (variable) {
            for (const modeId in variable.valuesByMode) {
                const value = variable.valuesByMode[modeId];
                const resolvedValue = await resolveValue(value, variable.resolvedType);
                tokens.push({
                    name: formatName(variable.name, caseStyle, format),
                    value: resolvedValue,
                    collection: collection.name,
                });
            }
        }
    }

    return tokens;
}

export function prepareFiles(tokens: VariableToken[], singleFile: boolean, format: ExportFormat): FileContent[] {
    const folderName = 'token-x-tractor-exports';
    if (singleFile) {
        const fileName = `tokens.${format === 'json' ? 'json' : 'css'}`;
        const content = format === 'json' ? JSON.stringify(tokens.reduce((acc, token) => {
            assignNestedValue(acc, token.name.split('/'), token.value);
            return acc;
        }, {}), null, 2) : convertToCSSVariables(tokens);
        return [{ name: `${folderName}/${fileName}`, content }];
    } else {
        const groupedTokens = tokens.reduce((acc: Record<string, VariableToken[]>, token) => {
            if (!acc[token.collection]) {
                acc[token.collection] = [];
            }
            acc[token.collection].push(token);
            return acc;
        }, {});

        return Object.keys(groupedTokens).map(collectionName => ({
            name: `${folderName}/${collectionName}.${format === 'json' ? 'json' : 'css'}`,
            content: format === 'json' ? JSON.stringify(groupedTokens[collectionName].reduce((acc, token) => {
                assignNestedValue(acc, token.name.split('/'), token.value);
                return acc;
            }, {}), null, 2) : convertToCSSVariables(groupedTokens[collectionName])
        }));
    }
}
