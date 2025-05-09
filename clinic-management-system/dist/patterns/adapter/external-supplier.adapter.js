"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSupplierAdapter = void 0;
class ExternalSupplierAdapter {
    static toSupplierData(externalData) {
        return {
            name: externalData.supplierName,
            contactInfo: externalData.contact,
            status: 'active',
        };
    }
}
exports.ExternalSupplierAdapter = ExternalSupplierAdapter;
