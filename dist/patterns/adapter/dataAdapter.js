"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppilerDataAdapter = void 0;
class SuppilerDataAdapter {
    constructor(externalData) {
        this.id = parseInt(externalData.supplierId);
        this.name = externalData.supplierName;
        this.address = externalData.supplierContact;
        this.email = externalData.supplierEmail;
        this.contactPerson = externalData.contactName;
        this.status = externalData.isActive ? 'active' : 'inactive';
    }
}
exports.SuppilerDataAdapter = SuppilerDataAdapter;
