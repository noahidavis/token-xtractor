import { VariableValue, VariableResolvedDataType, VariableAlias, CaseStyle, ExportFormat } from '../../types/tokenTypes';

export async function resolveValue(value: VariableValue, resolvedType: VariableResolvedDataType): Promise<string | number> {
    if ((value as VariableAlias).type === 'VARIABLE_ALIAS') {
        let currentValue = value as VariableAlias;
        while (currentValue.type === 'VARIABLE_ALIAS') {
            const variable = await figma.variables.getVariableByIdAsync(currentValue.id);
            if (variable) {
                currentValue = variable.valuesByMode[Object.keys(variable.valuesByMode)[0]] as VariableAlias;
            }
        }
        return formatResolvedValue(currentValue, resolvedType);
    } else {
        return formatResolvedValue(value, resolvedType);
    }
}

function formatResolvedValue(value: VariableValue, resolvedType: string): string | number {
    if (resolvedType === 'COLOR') {
        return rgbToHex(value as { r: number, g: number, b: number, a: number });
    } else if (resolvedType === 'FLOAT') {
        return parseFloat(value as string);
    } else {
        return value as string;
    }
}

export function convertToCSSVariables(tokens: { name: string, value: string | number }[]): string {
    return tokens.map(token => `--${token.name}: ${token.value};`).join('\n');
}

export function assignNestedValue(obj: any, keys: string[], value: any): void {
    keys.reduce((o, k, i) => {
        if (i === keys.length - 1) {
            o[k] = value;
        } else {
            o[k] = o[k] || {};
        }
        return o[k];
    }, obj);
}

export function rgbToHex({ r, g, b, a }: { r: number, g: number, b: number, a: number }): string {
    if (a !== 1) {
        return `rgba(${[r, g, b].map((n) => Math.round(n * 255)).join(", ")}, ${a.toFixed(4)})`;
    }
    const toHex = (value: number) => {
        const hex = Math.round(value * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const hex = [toHex(r), toHex(g), toHex(b)].join("");
    return `#${hex}`;
}

export function formatName(name: string, caseStyle: CaseStyle, format: ExportFormat): string {
    if (format === 'css') {
      name = name.replace(/\//g, '-');
    }
    switch (caseStyle) {
      case 'kebab':
        return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/\s+/g, '-');
      case 'camel':
        return name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      case 'snake':
        return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase().replace(/\s+/g, '_');
      default:
        return name;
    }
  }
  
