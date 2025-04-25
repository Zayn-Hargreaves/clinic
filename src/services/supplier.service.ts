import { SupplierRepository } from '../repositories/supplier.repository';
import { BadRequestException } from '../utils/exceptions';
import { ExternalSupplierData } from '../patterns/adapter/external-supplier.adapter';
import { Supplier } from '../models/supplier.model';

export class SupplierService {
    private supplierRepository: SupplierRepository;

    constructor() {
        this.supplierRepository = new SupplierRepository();
    }

    async getAllSuppliers(): Promise<Supplier[]> {
        return this.supplierRepository.findAll();
    }

    async getSupplierById(id: number): Promise<Supplier> {
        return this.supplierRepository.findById(id);
    }

    async createSupplier(data: Partial<Supplier>, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
        if (!data.name || !data.contactInfo) {
            throw new BadRequestException('Name and contactInfo are required');
        }
        return this.supplierRepository.createSupplier(data, type);
    }

    async createFromExternalApi(externalData: ExternalSupplierData, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
        return this.supplierRepository.createFromExternalData(externalData, type);
    }

    async searchSuppliers(name: string): Promise<Supplier[]> {
        return this.supplierRepository.findByName(name);
    }

    async findActiveSuppliers(): Promise<Supplier[]> {
        return this.supplierRepository.findActiveSuppliers();
    }

    async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
        return this.supplierRepository.updateSupplier(id, data);
    }

    async deleteSupplier(id: number): Promise<void> {
        return this.supplierRepository.deleteSupplier(id);
    }

    async importSupplies(supplierId: number, items: { supplyId: number; quantity: number }[]): Promise<any> {
        return this.supplierRepository.processImport(supplierId, items);
    }
}