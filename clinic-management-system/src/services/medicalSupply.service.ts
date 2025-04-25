import { Repository } from 'typeorm';
import { MedicalSupply } from '../models/medicalSupply.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class MedicalSupplyRepository {
    private repository: Repository<MedicalSupply>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(MedicalSupply);
    }

    async findById(id: number): Promise<MedicalSupply> {
        const supply = await this.repository.findOne({ where: { id } });
        if (!supply) {
            throw new NotFoundException('Medical supply not found');
        }
        return supply;
    }

    async updateStock(id: number, quantity: number): Promise<MedicalSupply> {
        const supply = await this.findById(id);
        supply.stockQuantity += quantity;
        return this.repository.save(supply);
    }
}