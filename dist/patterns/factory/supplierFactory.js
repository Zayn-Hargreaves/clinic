"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSupplierFactory = exports.MedicineSupplierFactory = void 0;
const supplier_model_1 = require("../../models/supplier.model");
class MedicineSupplierFactory {
    createSupplier(data) {
        const supplier = new supplier_model_1.Supplier();
        supplier.name = data.name || '';
        supplier.type = 'Medicine';
        supplier.contactInfo = data.contactInfo || '';
        supplier.status = data.status || 'active';
        return supplier;
    }
}
exports.MedicineSupplierFactory = MedicineSupplierFactory;
class EquipmentSupplierFactory {
    createSupplier(data) {
        const supplier = new supplier_model_1.Supplier();
        supplier.name = data.name || '';
        supplier.type = 'Equipment';
        supplier.contactInfo = data.contactInfo || '';
        supplier.status = data.status || 'active';
        return supplier;
    }
}
exports.EquipmentSupplierFactory = EquipmentSupplierFactory;
