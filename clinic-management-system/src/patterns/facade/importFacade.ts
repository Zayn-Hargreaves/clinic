import { ImportVoucher } from '../../models/importVoucher.model';
import { MedicalSupplyRepository } from '../../repositories/medicalSupply.repository';
import { SupplierRepository } from '../../repositories/supplier.repository';
import { NotFoundException } from '../../utils/exceptions';

export class ImportProcessFacade {
    importVoucherRepository: any;
    constructor(
        private supplierRepository: SupplierRepository,
        private medicalSupplyRepository: MedicalSupplyRepository
    ) { }

    async processImport(supplierId: number, items: { supplyId: number; quantity: number }[]) {
        const supplier = await this.supplierRepository.findById(supplierId);
        for (const item of items) {
            await this.medicalSupplyRepository.updateStock(item.supplyId, item.quantity);
        }
        return { success: true, supplier };
    }
    async getSupplierStats(startDate: string, endDate: string, search?: string) {
        // Phối hợp các repository để lấy thống kê
        const suppliers = await this.supplierRepository.findByName(search);
        const stats = await Promise.all(
            suppliers.map(async (supplier) => {
                const vouchers = await this.importVoucherRepository.findBySupplier(supplier.id, startDate, endDate);
                return {
                    supplier,
                    totalVouchers: vouchers.length,
                    totalValue: vouchers.reduce((sum:number, v:ImportVoucher) => sum + v.totalAmount, 0),
                };
            })
        );
        return stats;
    }
}