/**
 * SimpleLabOS Open Standard - Dental Type Definitions
 * 
 * These type definitions represent the industry standard for digital dental lab case management.
 * Feel free to use these in your own integrations or plugin development.
 * 
 * @license MIT
 */

export type ToothSystem = 'FDI' | 'Universal' | 'Palmer';

export type ProductType =
    | 'Crown'
    | 'Bridge'
    | 'Veneer'
    | 'Inlay'
    | 'Onlay'
    | 'Implant'
    | 'Denture'
    | 'Splint'
    | 'Aligner';

export type MaterialType =
    | 'Zirconia_Monolithic'
    | 'Zirconia_Layered'
    | 'Emax'
    | 'PMMA'
    | 'PEEK'
    | 'Titanium'
    | 'Cobalt_Chrome'
    | 'Gold';

export type Shade =
    | 'A1' | 'A2' | 'A3' | 'A3.5' | 'A4'
    | 'B1' | 'B2' | 'B3' | 'B4'
    | 'C1' | 'C2' | 'C3' | 'C4'
    | 'D2' | 'D3' | 'D4'
    | 'BL1' | 'BL2' | 'BL3' | 'BL4';

export interface DentalCase {
    id: string;
    external_ref?: string; // e.g. from Medit/3Shape
    patient: {
        name: string;
        record_number?: string;
        date_of_birth?: string;
    };
    doctor: {
        id: string;
        name: string;
        license_number?: string;
    };
    restorations: Restoration[];
    status: CaseStatus;
    due_date: string;
    created_at: string;
}

export interface Restoration {
    tooth_number: number; // Always stored in Universal (1-32) internally
    type: ProductType;
    material: MaterialType;
    shade: Shade;
    stump_shade?: Shade;
    notes?: string;
    design_files?: string[]; // S3 URLs to STL/PLY
}

export type CaseStatus =
    | 'received'
    | 'scanned'
    | 'design_in_progress'
    | 'designed'
    | 'milling'
    | 'sintering'
    | 'glazing'
    | 'qc_check'
    | 'shipped'
    | 'delivered';
