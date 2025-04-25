export interface SupplierData {
    name: string;
    contactInfo: string;
    status?: string;
}

export interface ExternalSupplierData {
    supplierName: string;
    contact: string;
}

export class ExternalSupplierAdapter {
    static toSupplierData(externalData: ExternalSupplierData): SupplierData {
        return {
            name: externalData.supplierName,
            contactInfo: externalData.contact,
            status: 'active',
        };
    }
}