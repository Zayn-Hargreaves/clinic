import { getRepository } from 'typeorm';
import { ImportDetail } from '../models/importDetail.model';
import { BaseRepository } from './base.repository';

export class ImportDetailRepository extends BaseRepository<ImportDetail> {
    constructor() {
        super(getRepository(ImportDetail));
    }

    async findByVoucherId(voucherId: number): Promise<ImportDetail[]> {
        return getRepository(ImportDetail)
            .createQueryBuilder('detail')
            .leftJoinAndSelect('detail.medicalSupply', 'supply')
            .leftJoinAndSelect('detail.medicine', 'medicine')
            .where('detail.import_voucher_id = :voucherId', { voucherId })
            .getMany();
    }
}