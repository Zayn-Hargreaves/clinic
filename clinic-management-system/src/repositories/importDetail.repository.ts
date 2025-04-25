import { DatabaseConnection } from '../patterns/singleton/database';
import { ImportDetail } from '../models/importDetail.model';
import { BaseRepository } from './base.repository';

export class ImportDetailRepository extends BaseRepository<ImportDetail> {
    constructor() {
        super(DatabaseConnection.getInstance().getDataSource().getRepository(ImportDetail));
    }

    async findByVoucherId(voucherId: number): Promise<ImportDetail[]> {
        return this.repository
            .createQueryBuilder('detail')
            .leftJoinAndSelect('detail.medicalSupply', 'supply')
            .leftJoinAndSelect('detail.medicine', 'medicine')
            .where('detail.importVoucherId = :voucherId', { voucherId })
            .getMany();
    }
}