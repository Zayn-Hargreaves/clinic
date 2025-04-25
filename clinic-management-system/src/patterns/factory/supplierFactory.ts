import { Supplier } from '../../models/supplier.model';

export interface SupplierFactory {
    createSupplier(data: Partial<Supplier>): Supplier;
}

export class MedicineSupplierFactory implements SupplierFactory {
    createSupplier(data: Partial<Supplier>): Supplier {
        const supplier = new Supplier();
        supplier.name = data.name || '';
        supplier.type = 'Medicine';
        supplier.contactInfo = data.contactInfo || '';
        supplier.status = data.status || 'active';
        return supplier;
    }
}

export class EquipmentSupplierFactory implements SupplierFactory {
    createSupplier(data: Partial<Supplier>): Supplier {
        const supplier = new Supplier();
        supplier.name = data.name || '';
        supplier.type = 'Equipment';
        supplier.contactInfo = data.contactInfo || '';
        supplier.status = data.status || 'active';
        return supplier;
    }
}