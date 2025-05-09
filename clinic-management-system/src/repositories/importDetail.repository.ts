import { Repository } from 'typeorm';
import { ImportDetail } from '../models/importDetail.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class ImportDetailRepository {
    private repository: Repository<ImportDetail>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(ImportDetail);
    }

    async findByVoucherId(voucherId: number): Promise<ImportDetail[]> {
        return this.repository.find({ where: { importVoucherId: voucherId } });
    }

    async createImportDetails(details: Partial<ImportDetail>[]): Promise<ImportDetail[]> {
        const entities = this.repository.create(details);
        return this.repository.save(entities);
    }

    async createImportDetail(data: Partial<ImportDetail>): Promise<ImportDetail> {
        const detail = this.repository.create(data);
        return this.repository.save(detail);
    }

    async findById(id: number): Promise<ImportDetail> {
        const detail = await this.repository.findOne({ where: { id } });
        if (!detail) throw new NotFoundException('Import detail not found');
        return detail;
    }

    async updateImportDetail(id: number, data: Partial<ImportDetail>): Promise<ImportDetail> {
        const detail = await this.findById(id);
        Object.assign(detail, data);
        return this.repository.save(detail);
    }

    async deleteImportDetail(id: number): Promise<void> {
        const detail = await this.findById(id);
        await this.repository.remove(detail);
    }
}