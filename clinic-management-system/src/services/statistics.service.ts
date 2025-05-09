import { SupplierRepository } from '../repositories/supplier.repository';
import { ImportVoucherRepository } from '../repositories/importVoucher.repository';
import { ImportDetailRepository } from '../repositories/importDetail.repository';
import { SupplierStatsReport } from '../patterns/templateMethod/ReportTemplate';
import { ImportProcessFacade } from '../patterns/facade/importFacade';
import { MedicalSupplyRepository } from '../repositories/medicalSupply.repository';
import { MedicineRepository } from '../repositories/medicine.repository';

export class StatisticsService {
    private supplierRepo = new SupplierRepository();
    private importVoucherRepo = new ImportVoucherRepository();
    private importDetailRepo = new ImportDetailRepository();
    private medicalSupplyRepo = new MedicalSupplyRepository();
    private medicineRepo = new MedicineRepository();
    private importFacade = new ImportProcessFacade(this.supplierRepo, null, this.importVoucherRepo);

    async getSupplierStats(startDate: string, endDate: string, search?: string) {
        const report = new SupplierStatsReport(this.importFacade);
        return report.generateReport({ startDate, endDate, search });
    }

    async getImportVouchersBySupplier(supplierId: number, startDate?: string, endDate?: string, page = 1, limit = 10) {
        const vouchers = await this.importVoucherRepo.findBySupplier(supplierId, startDate, endDate, page, limit);
        const total = await this.importVoucherRepo.countBySupplier(supplierId, startDate, endDate);
        return { vouchers, total };
    }

    async getImportVoucherDetails(voucherId: number) {
        const voucher = await this.importVoucherRepo.findByIdWithDetails(voucherId);
        const details = await this.importDetailRepo.findByVoucherId(voucherId);

        // Lấy danh sách vật tư/thuốc để ánh xạ itemName
        const medicalSupplies = await this.medicalSupplyRepo.findAll();
        const medicines = await this.medicineRepo.findAll();
        const itemsMap = new Map<number, { name: string, type: string }>();
        medicalSupplies.forEach(item => itemsMap.set(item.id, { name: item.name, type: 'supply' }));
        medicines.forEach(item => itemsMap.set(item.id, { name: item.name, type: 'medicine' }));

        return {
            ...voucher,
            items: details.map(detail => ({
                id: detail.id,
                itemType: detail.itemType,
                itemName: itemsMap.get(detail.itemId)?.name || 'Không xác định',
                quantity: detail.quantity,
                unitPrice: detail.unitPrice,
                totalPrice: detail.totalPrice,
            })),
        };
    }
}