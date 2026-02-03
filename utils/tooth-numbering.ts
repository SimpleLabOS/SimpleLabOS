/**
 * SimpleLabOS Open Utils - Tooth Numbering Converter
 * 
 * A zero-dependency utility to convert between ISO 3950 (FDI) and Universal Numbering System (UNS).
 * Handles the complexities of quadrant mapping automatically.
 * 
 * @example
 * convertTooth(11, 'FDI', 'Universal') // Returns 8
 * convertTooth(30, 'Universal', 'FDI') // Returns 46
 */

type System = 'FDI' | 'Universal';

// Mapping table for O(1) lookups
const TOOTH_MAP: Record<number, number> = {
    // Universal -> FDI
    1: 18, 2: 17, 3: 16, 4: 15, 5: 14, 6: 13, 7: 12, 8: 11,
    9: 21, 10: 22, 11: 23, 12: 24, 13: 25, 14: 26, 15: 27, 16: 28,
    17: 38, 18: 37, 19: 36, 20: 35, 21: 34, 22: 33, 23: 32, 24: 31,
    25: 41, 26: 42, 27: 43, 28: 44, 29: 45, 30: 46, 31: 47, 32: 48
};

// Reverse map (FDI -> Universal)
const REVERSE_MAP: Record<number, number> = Object.entries(TOOTH_MAP).reduce((acc, [uni, fdi]) => {
    acc[fdi] = parseInt(uni);
    return acc;
}, {} as Record<number, number>);

export function convertTooth(
    number: number,
    from: System,
    to: System
): number {
    if (from === to) return number;

    if (from === 'Universal' && to === 'FDI') {
        const fdi = TOOTH_MAP[number];
        if (!fdi) throw new Error(`Invalid Universal tooth number: ${number}`);
        return fdi;
    }

    if (from === 'FDI' && to === 'Universal') {
        const uni = REVERSE_MAP[number];
        if (!uni) throw new Error(`Invalid FDI tooth number: ${number}`);
        return uni;
    }

    throw new Error('Unsupported conversion path');
}

/**
 * Returns true if the tooth number is valid for the given system
 */
export function isValidTooth(number: number, system: System): boolean {
    if (system === 'Universal') {
        return number >= 1 && number <= 32;
    }
    if (system === 'FDI') {
        // Check quadrants 1-4 and teeth 1-8
        const quadrant = Math.floor(number / 10);
        const tooth = number % 10;
        return quadrant >= 1 && quadrant <= 4 && tooth >= 1 && tooth <= 8;
    }
    return false;
}

export default {
    convertTooth,
    isValidTooth
};
