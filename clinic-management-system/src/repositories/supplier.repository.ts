import { Repository } from 'typeorm';
import { Supplier } from '../models/supplier.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';
import { MedicineSupplierFactory, EquipmentSupplierFactory } from '../patterns/factory/supplierFactory';
import { ExternalSupplierAdapter, ExternalSupplierData, SupplierData } from '../patterns/adapter/external-supplier.adapter';
import { InventorySubject, LowStockEmailObserver } from '../patterns/observer/inventoryObserver';
import { ImportProcessFacade } from '../patterns/facade/importFacade';
import { MedicalSupplyRepository } from './medicalSupply.repository';

export class SupplierRepository {
  private repository: Repository<Supplier>;
  private inventorySubject: InventorySubject;
  private importFacade: ImportProcessFacade;

  constructor() {
    this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Supplier);
    this.inventorySubject = new InventorySubject();
    this.inventorySubject.addObserver(new LowStockEmailObserver());
    this.importFacade = new ImportProcessFacade(this, new MedicalSupplyRepository());
  }

  async findAll(): Promise<Supplier[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Supplier> {
    const supplier = await this.repository.findOne({ where: { id } });
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }

  async findByName(name: string|undefined): Promise<Supplier[]> {
    if(!name){
      throw new NotFoundException("Supplier not found")
    }
    return this.repository
      .createQueryBuilder('supplier')
      .where('supplier.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findActiveSuppliers(): Promise<Supplier[]> {
    return this.repository
      .createQueryBuilder('supplier')
      .where('supplier.status = :status', { status: 'active' })
      .getMany();
  }

  async createSupplier(data: Partial<Supplier>, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    const factory = type === 'Medicine' ? new MedicineSupplierFactory() : new EquipmentSupplierFactory();
    const supplier = factory.createSupplier(data);
    const savedSupplier = await this.repository.save(supplier);
    await this.notifyInventoryChange(savedSupplier);
    return savedSupplier;
  }

  async createFromExternalData(externalData: ExternalSupplierData, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    const supplierData = ExternalSupplierAdapter.toSupplierData(externalData);
    return this.createSupplier(supplierData, type);
  }

  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
    const supplier = await this.findById(id);
    Object.assign(supplier, data);
    const updatedSupplier = await this.repository.save(supplier);
    await this.notifyInventoryChange(updatedSupplier);
    return updatedSupplier;
  }

  async deleteSupplier(id: number): Promise<void> {
    const supplier = await this.findById(id);
    await this.repository.remove(supplier);
    await this.notifyInventoryChange(supplier);
  }

  async processImport(supplierId: number, items: { supplyId: number; quantity: number }[]): Promise<any> {
    return this.importFacade.processImport(supplierId, items);
  }

  private async notifyInventoryChange(supplier: Supplier): Promise<void> {
    const supplies = await this.repository
      .createQueryBuilder('supplier')
      .relation(Supplier, 'supplies')
      .of(supplier)
      .loadMany();
    supplies.forEach((supply) => this.inventorySubject.notifyObservers(supply));
  }
}