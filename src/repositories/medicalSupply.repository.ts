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
}