import { MedicineRepository } from '../repositories/medicine.repository';
import { Medicine } from '../models/medicine.model';

export class MedicineService {
    private repository: MedicineRepository;

    constructor() {
        this.repository = new MedicineRepository();
    }

    // Lấy tất cả thuốc
    async getAll(): Promise<Medicine[]> {
        return this.repository.findAll();
    }

    // Lấy thuốc theo ID
    async getById(id: number): Promise<Medicine> {
        return this.repository.findById(id);
    }

    // Lấy danh sách thuốc theo nhà cung cấp
    async getBySupplier(supplierId: number): Promise<Medicine[]> {
        return this.repository.findBySupplier(supplierId);
    }

    // Tạo mới thuốc
    async createMedicine(data: Partial<Medicine>): Promise<Medicine> {
        return this.repository.createMedicine(data);
    }

    // Cập nhật thuốc
    async updateMedicine(id: number, data: Partial<Medicine>): Promise<Medicine> {
        return this.repository.updateMedicine(id, data);
    }

    // Xóa thuốc
    async deleteMedicine(id: number): Promise<void> {
        return this.repository.deleteMedicine(id);
    }
}