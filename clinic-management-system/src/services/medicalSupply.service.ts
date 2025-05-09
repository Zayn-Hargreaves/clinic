import { MedicalSupplyRepository } from '../repositories/medicalSupply.repository';
import { MedicalSupply } from '../models/medicalSupply.model';

export class MedicalSupplyService {
    private repository: MedicalSupplyRepository;

    constructor() {
        this.repository = new MedicalSupplyRepository();
    }

    // Lấy vật tư y tế theo ID
    async getById(id: number): Promise<MedicalSupply> {
        return this.repository.findById(id);
    }

    // Cập nhật tồn kho vật tư y tế
    async updateStock(id: number, quantity: number): Promise<MedicalSupply> {
        return this.repository.updateStock(id, quantity);
    }

    // Lấy danh sách vật tư y tế theo nhà cung cấp
    async getBySupplier(supplierId: number): Promise<MedicalSupply[]> {
        return this.repository.findBySupplier(supplierId);
    }

    // Lấy tất cả vật tư y tế
    async getAll(): Promise<MedicalSupply[]> {
        return this.repository.findAll();
    }

    // Tạo mới vật tư y tế
    async createMedicalSupply(data: Partial<MedicalSupply>): Promise<MedicalSupply> {
        return this.repository.createMedicalSupply(data);
    }

    // Cập nhật vật tư y tế
    async updateMedicalSupply(id: number, data: Partial<MedicalSupply>): Promise<MedicalSupply> {
        return this.repository.updateMedicalSupply(id, data);
    }

    // Xóa vật tư y tế
    async deleteMedicalSupply(id: number): Promise<void> {
        return this.repository.deleteMedicalSupply(id);
    }
}