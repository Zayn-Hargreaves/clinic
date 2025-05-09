import { Repository } from 'typeorm';
import { MedicalSupply } from '../models/medicalSupply.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';
import { InventorySubject, LowStockEmailObserver } from '../patterns/observer/inventoryObserver';
export class MedicalSupplyRepository {
    private repository: Repository<MedicalSupply>;
    private inventorySubject: InventorySubject;
    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(MedicalSupply);
        this.inventorySubject = new InventorySubject();
        this.inventorySubject.addObserver(new LowStockEmailObserver());
    }

    async findById(id: number): Promise<MedicalSupply> {
        const supply = await this.repository.findOne({ where: { id } });
        if (!supply) {
            throw new NotFoundException('Medical supply not found');
        }
        return supply;
    }

    async updateStock(id: number, quantity: number) {
        const supply = await this.findById(id);
        supply.stockQuantity += quantity;
        await this.repository.save(supply);
        this.inventorySubject.notifyObservers(supply);
        return supply;
    }
    // Lấy tất cả vật tư y tế
    async findAll(): Promise<MedicalSupply[]> {
        return this.repository.find();
    }

    // Lấy vật tư y tế theo nhà cung cấp
    async findBySupplier(supplierId: number): Promise<MedicalSupply[]> {
        return this.repository.find({ where: { supplierId } });
    }

    // Tạo mới vật tư y tế
    async createMedicalSupply(data: Partial<MedicalSupply>): Promise<MedicalSupply> {
        const supply = this.repository.create(data);
        return this.repository.save(supply);
    }

    // Cập nhật vật tư y tế
    async updateMedicalSupply(id: number, data: Partial<MedicalSupply>): Promise<MedicalSupply> {
        const supply = await this.findById(id);
        Object.assign(supply, data);
        return this.repository.save(supply);
    }

    // Xóa vật tư y tế
    async deleteMedicalSupply(id: number): Promise<void> {
        const supply = await this.findById(id);
        await this.repository.remove(supply);
    }
}