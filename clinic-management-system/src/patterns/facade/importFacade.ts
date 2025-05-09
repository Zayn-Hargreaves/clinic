import { SupplierRepository } from '../../repositories/supplier.repository';
import { ImportVoucherRepository } from '../../repositories/importVoucher.repository';

export class ImportProcessFacade {
    constructor(
        private supplierRepo: SupplierRepository,
        private medicalRepo: any,
        private importVoucherRepo: ImportVoucherRepository
    ) { }

    async getSupplierStats(startDate: string, endDate: string, search?: string) {
        const suppliers = await this.supplierRepo.findAll(search);
        const stats = await Promise.all(
            suppliers.map(async (supplier) => {
                const vouchers = await this.importVoucherRepo.findBySupplier(
                    supplier.id,
                    startDate,
                    endDate
                );
                return {
                    supplier: { id: supplier.id, name: supplier.name },
                    totalVouchers: vouchers.length,
                    totalValue: vouchers.reduce((sum, v) => sum + Number(v.totalAmount), 0),
                };
            })
        );
        return stats;
    }
}