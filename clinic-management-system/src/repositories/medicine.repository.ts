import { Repository } from 'typeorm';
import { Medicine } from '../models/medicine.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class MedicineRepository {
    private repository: Repository<Medicine>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(Medicine);
    }

    // Lấy tất cả thuốc
    async findAll(): Promise<Medicine[]> {
        return this.repository.find();
    }

    // Lấy thuốc theo ID
    async findById(id: number): Promise<Medicine> {
        const medicine = await this.repository.findOne({ where: { id } });
        if (!medicine) throw new NotFoundException('Medicine not found');
        return medicine;
    }

    // Lấy danh sách thuốc theo nhà cung cấp
    async findBySupplier(supplierId: number): Promise<Medicine[]> {
        return this.repository.find({ where: { supplierId } });
    }

    // Tạo mới thuốc
    async createMedicine(data: Partial<Medicine>): Promise<Medicine> {
        const medicine = this.repository.create(data);
        return this.repository.save(medicine);
    }

    // Cập nhật thuốc
    async updateMedicine(id: number, data: Partial<Medicine>): Promise<Medicine> {
        const medicine = await this.findById(id);
        Object.assign(medicine, data);
        return this.repository.save(medicine);
    }

    // Xóa thuốc
    async deleteMedicine(id: number): Promise<void> {
        const medicine = await this.findById(id);
        await this.repository.remove(medicine);
    }
}