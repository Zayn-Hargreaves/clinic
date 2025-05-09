import { SupplierRepository } from '../repositories/supplier.repository';
import { Supplier } from '../models/supplier.model';
import { ExternalSupplierData } from '../patterns/adapter/external-supplier.adapter';

export class SupplierService {
  private supplierRepository: SupplierRepository;

  constructor() {
    this.supplierRepository = new SupplierRepository();
  }

  // Lấy tất cả nhà cung cấp
  async getAllSuppliers(): Promise<Supplier[]> {
    return await this.supplierRepository.findAll();
  }

  // Lấy nhà cung cấp theo ID
  async getSupplierById(id: number): Promise<Supplier | null> {
    return this.supplierRepository.findById(id);
  }

  // Tìm kiếm nhà cung cấp theo tên
  async searchSuppliers(name: string): Promise<Supplier[]> {
    return this.supplierRepository.findByName(name);
  }

  // Lấy danh sách nhà cung cấp đang hoạt động
  async findActiveSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.findActiveSuppliers();
  }

  // Tạo mới nhà cung cấp
  async createSupplier(data: Partial<Supplier>, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    return this.supplierRepository.createSupplier(data, type);
  }

  // Tạo mới nhà cung cấp từ external API (nếu có)
  async createFromExternalApi(externalData: ExternalSupplierData, type: 'Medicine' | 'Equipment'): Promise<Supplier> {
    return this.supplierRepository.createFromExternalData(externalData, type);
  }

  // Cập nhật nhà cung cấp
  async updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier> {
    return this.supplierRepository.updateSupplier(id, data);
  }

  // Xóa nhà cung cấp
  async deleteSupplier(id: number): Promise<void> {
    return this.supplierRepository.deleteSupplier(id);
  }
}