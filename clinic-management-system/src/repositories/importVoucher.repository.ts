import { Repository, Between } from 'typeorm';
import { ImportVoucher } from '../models/importVoucher.model';
import { DatabaseConnection } from '../patterns/singleton/database';
import { NotFoundException } from '../utils/exceptions';

export class ImportVoucherRepository {
    private repository: Repository<ImportVoucher>;

    constructor() {
        this.repository = DatabaseConnection.getInstance().getDataSource().getRepository(ImportVoucher);
    }

    async findAll(): Promise<ImportVoucher[]> {
        return this.repository.find();
    }

    async findAllWithSupplier(): Promise<ImportVoucher[]> {
        return this.repository.find({
            relations: ['supplier'],
            select: {
                id: true,
                importDate: true,
                totalAmount: true,
                supplierId: true,
                employeeId: true,
                status: true,
                supplier: { id: true, name: true },
            },
        });
    }

    async findById(id: number): Promise<ImportVoucher> {
        const voucher = await this.repository.findOne({ where: { id } });
        if (!voucher) throw new NotFoundException('Import voucher not found');
        return voucher;
    }

    async findByIdWithDetails(id: number): Promise<ImportVoucher> {
        const voucher = await this.repository.findOne({
            where: { id },
            relations: ['supplier', 'importDetails'],
            select: {
                id: true,
                importDate: true,
                totalAmount: true,
                supplierId: true,
                employeeId: true,
                status: true,
                supplier: { id: true, name: true },
                importDetails: {
                    id: true,
                    itemId: true,
                    itemType: true,
                    quantity: true,
                    unitPrice: true,
                    totalPrice: true,
                },
            },
        });
        if (!voucher) throw new NotFoundException('Import voucher not found');
        return voucher;
    }

    async findBySupplier(
        supplierId: number,
        startDate?: string,
        endDate?: string,
        page: number = 1,
        limit: number = 10
    ): Promise<ImportVoucher[]> {
        const query = this.repository
            .createQueryBuilder('voucher')
            .leftJoinAndSelect('voucher.supplier', 'supplier')
            .select([
                'voucher.id',
                'voucher.importDate',
                'voucher.totalAmount',
                'voucher.supplierId',
                'voucher.employeeId',
                'voucher.status',
                'supplier.id',
                'supplier.name',
            ])
            .where('voucher.supplierId = :supplierId', { supplierId });

        if (startDate && endDate) {
            query.andWhere('voucher.importDate BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }

        query.skip((page - 1) * limit).take(limit);
        return query.getMany();
    }

    async createImportVoucher(data: Partial<ImportVoucher>): Promise<ImportVoucher> {
        const voucher = this.repository.create(data);
        return this.repository.save(voucher);
    }

    async updateImportVoucher(id: number, data: Partial<ImportVoucher>): Promise<ImportVoucher> {
        const voucher = await this.findById(id);
        Object.assign(voucher, data);
        return this.repository.save(voucher);
    }

    async deleteImportVoucher(id: number): Promise<void> {
        const voucher = await this.findById(id);
        await this.repository.remove(voucher);
    }

    async countBySupplier(supplierId: number, startDate?: string, endDate?: string) {
        const query = this.repository.createQueryBuilder('voucher')
            .where('voucher.supplierId = :supplierId', { supplierId });
        if (startDate && endDate) {
            query.andWhere('voucher.importDate BETWEEN :startDate AND :endDate', { startDate, endDate });
        }
        return query.getCount();
    }
}