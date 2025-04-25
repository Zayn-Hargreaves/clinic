import { Repository, Between } from 'typeorm';
import { ImportVoucher } from '../models/importVoucher.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class ImportVoucherRepository {
    private repository: Repository<ImportVoucher>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(ImportVoucher);
    }

    async findBySupplier(supplierId: number, startDate: string, endDate: string): Promise<ImportVoucher[]>;
    async findBySupplier(supplierId: number, limit: number): Promise<ImportVoucher[]>;
    async findBySupplier(supplierId: number, arg1: string | number, arg2?: string): Promise<ImportVoucher[]> {
        const query = this.repository.createQueryBuilder('voucher').where('voucher.supplierId = :supplierId', { supplierId });

        if (typeof arg1 === 'string' && arg2) {
            query.andWhere('voucher.createdAt BETWEEN :startDate AND :endDate', { startDate: arg1, endDate: arg2 });
        } else if (typeof arg1 === 'number') {
            query.take(arg1);
        }

        return query.getMany();
    }

    async findById(id: number): Promise<ImportVoucher> {
        const voucher = await this.repository.findOne({ where: { id } });
        if (!voucher) {
            throw new NotFoundException('Import voucher not found');
        }
        return voucher;
    }
}