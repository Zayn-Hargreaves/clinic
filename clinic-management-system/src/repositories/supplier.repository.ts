import { Repository } from 'typeorm';
import { Supplier } from '../models/supplier.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';
import { MedicineSupplierFactory, EquipmentSupplierFactory } from '../patterns/factory/supplierFactory';
import { ExternalSupplierAdapter, ExternalSupplierData } from '../patterns/adapter/external-supplier.adapter';

export class SupplierRepository {
  private repository: Repository<Supplier>;

  constructor() {
    this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Supplier);
  }

  // Lấy tất cả nhà cung cấp
  async findAll(): Promise<Supplier[]> {
    const supplier = await this.repository.find()
    return supplier
  }

  // Lấy nhà cung cấp theo ID
  async findById(id: number): Promise<Supplier | null> {
    const supplier = await this.repository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async find(): Promise<Supplier[]> {
    return this.repository
      .createQueryBuilder('supplier')
      .getMany();
  }
  // Tìm kiếm nhà cung cấp theo tên
  async findByName(name: string): Promise<Supplier[]> {
    return this.repository
      .createQueryBuilder('supplier')
      .where('supplier.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  // Lấy danh sách nhà cung cấp đang hoạt động
  async findActiveSuppliers(): Promise<Supplier[]> {
    return this.repository
      .createQueryBuilder('supplier')
      .where('supplier.status = :status', { status: 'active' })
      .getMany();
  }

  // Tạo mới nhà cung cấp sử dụng Factory pattern
  async createSupplier(data: Partial<Supplier>, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    const factory =
      type === 'Medicine'
        ? new MedicineSupplierFactory()
        : new EquipmentSupplierFactory();
    const supplier = factory.createSupplier(data);
    return this.repository.save(supplier);
  }

  // Tạo mới nhà cung cấp từ dữ liệu external (Adapter pattern)
  async createFromExternalData(externalData: ExternalSupplierData, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    const supplierData = ExternalSupplierAdapter.toSupplierData(externalData);
    return this.createSupplier(supplierData, type);
  }

  // Cập nhật nhà cung cấp
  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
    const supplier = await this.findById(id);
    if (!supplier) throw new NotFoundException('Supplier not found');
    Object.assign(supplier, data);
    return this.repository.save(supplier);
  }

  // Xóa nhà cung cấp
  async deleteSupplier(id: number): Promise<void> {
    const supplier = await this.findById(id);
    if (!supplier) throw new NotFoundException('Supplier not found');
    await this.repository.remove(supplier);
  }
}