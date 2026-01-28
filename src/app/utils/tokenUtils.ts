import {
    VariableToken,
    FileContent,
    CaseStyle,
    ExportFormat,
    VariableCollection,
} from '../../types/tokenTypes';
import {
    resolveValue,
    formatName,
    convertToCSSVariables,
    assignNestedValue,
} from './valueUtils';

function parseSelections(selections: string[]) {
    const map = new Map<string, Set<string>>();

    for (const s of selections) {
        // Use '::' as delimiter to avoid conflicts with ':' in Figma IDs
        const parts = s.split('::');

        // legacy: ["collectionId"] (no delimiter)
        if (parts.length === 1) {
            const collectionId = parts[0];
            if (!collectionId) continue;
            if (!map.has(collectionId)) map.set(collectionId, new Set());
            map.get(collectionId)!.add('__all__');
            continue;
        }

        const [collectionId, modeId] = parts;
        if (!collectionId || !modeId) continue;

        if (!map.has(collectionId)) map.set(collectionId, new Set());
        map.get(collectionId)!.add(modeId);
    }

    return map;
}

function buildModeNameMap(collection: VariableCollection) {
    const map = new Map<string, string>();
    for (const m of collection.modes ?? []) {
        map.set(m.modeId, m.name);
    }
    return map;
}

function getModeKey(token: VariableToken, caseStyle: CaseStyle) {
    return formatName(token.modeName, caseStyle, 'json');
}

export async function extractTokens(
    caseStyle: CaseStyle,
    singleFile: boolean,
    collections: string[],
    allCollections: VariableCollection[],
    format: ExportFormat
): Promise<VariableToken[]> {
    const selectedAll = collections.includes('all');
    const selectionMap = selectedAll ? null : parseSelections(collections);

    const selectedCollections = selectedAll
        ? allCollections
        : allCollections.filter((c) => selectionMap?.has(c.id));

    let tokens: VariableToken[] = [];

    for (const collection of selectedCollections) {
        const selectedModes = selectedAll
            ? '__all__'
            : selectionMap!.get(collection.id)!;

        const collectionTokens = await processCollection(
            collection,
            caseStyle,
            format,
            selectedModes
        );

        tokens = tokens.concat(collectionTokens);
    }

    return tokens;
}

async function processCollection(
    collection: VariableCollection,
    caseStyle: CaseStyle,
    format: ExportFormat,
    selectedModes: '__all__' | Set<string>
): Promise<VariableToken[]> {
    const tokens: VariableToken[] = [];
    const variableIds = collection.variableIds;

    const modeNameMap = buildModeNameMap(collection);

    const allowed =
        selectedModes === '__all__'
            ? new Set(collection.modes?.map((m) => m.modeId) ?? [])
            : selectedModes.has('__all__')
                ? new Set(collection.modes?.map((m) => m.modeId) ?? [])
                : selectedModes;

    for (const variableId of variableIds) {
        const variable = await figma.variables.getVariableByIdAsync(variableId);
        if (!variable) continue;

        for (const modeId of allowed) {
            const value = variable.valuesByMode[modeId];
            if (value === undefined) continue;

            const resolvedValue = await resolveValue(
                value,
                variable.resolvedType
            );

            const modeName = modeNameMap.get(modeId) ?? modeId;

            tokens.push({
                name: formatName(variable.name, caseStyle, format),
                value: resolvedValue,
                collection: collection.name,
                modeId,
                modeName,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any);
        }
    }

    return tokens;
}

export function prepareFiles(
    tokens: VariableToken[],
    singleFile: boolean,
    format: ExportFormat,
    caseStyle: CaseStyle
): FileContent[] {
    const folderName = 'token-x-tractor-exports';

    if (singleFile) {
        const fileName = `tokens.${format === 'json' ? 'json' : 'css'}`;
        const content =
            format === 'json'
                ? JSON.stringify(
                    tokens.reduce((acc, token) => {
                        assignNestedValue(
                            acc,
                            [getModeKey(token, caseStyle), ...token.name.split('/')],
                            token.value
                        );
                        return acc;
                    }, {}),
                    null,
                    2
                )
                : convertToCSSVariables(tokens);

        return [{ name: `${folderName}/${fileName}`, content }];
    }

    const groupedTokens = tokens.reduce(
        (acc: Record<string, VariableToken[]>, token) => {
            if (!acc[token.collection]) acc[token.collection] = [];
            acc[token.collection].push(token);
            return acc;
        },
        {}
    );

    return Object.keys(groupedTokens).map((collectionName) => ({
        name: `${folderName}/${collectionName}.${format === 'json' ? 'json' : 'css'}`,
        content:
            format === 'json'
                ? JSON.stringify(
                    groupedTokens[collectionName].reduce((acc, token) => {
                        assignNestedValue(
                            acc,
                            [getModeKey(token, caseStyle), ...token.name.split('/')],
                            token.value
                        );
                        return acc;
                    }, {}),
                    null,
                    2
                )
                : convertToCSSVariables(groupedTokens[collectionName]),
    }));
}
