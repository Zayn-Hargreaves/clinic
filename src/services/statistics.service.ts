import { SupplierRepository } from '../repositories/supplier.repository';
import { ImportVoucherRepository } from '../repositories/importVoucher.repository';
import { ImportDetailRepository } from '../repositories/importDetail.repository';
import moment from 'moment';
import { BadRequestException } from '../utils/exceptions';
import { Supplier } from '../models/supplier.model';
import { getRepository } from 'typeorm';
import { ImportVoucher } from '../models/importVoucher.model';
import { ImportVoucherIterator } from '../patterns/iterator/ImportVoucherIterator';
import { SupplierStatsReport } from '../patterns/templateMethod/ReportTemplate';

export class StatisticsService {
    private supplierRepo: SupplierRepository;
    private importVoucherRepo: ImportVoucherRepository;
    private importDetailRepo: ImportDetailRepository;
    importFacade: any;

    constructor() {
        this.supplierRepo = new SupplierRepository();
        this.importVoucherRepo = new ImportVoucherRepository();
        this.importDetailRepo = new ImportDetailRepository();
    }


    async getImportVouchersBySupplier(supplierId: number, startDate: string, endDate: string, page: number, limit: number) {
        const iterator = new ImportVoucherIterator(new ImportVoucherRepository(), supplierId, limit);
        const vouchers: ImportVoucher[] = [];
        while (iterator.hasNext()) {
            const voucher = iterator.next();
            if (voucher) vouchers.push(voucher);
        }
        return { vouchers, total: vouchers.length };
    }

    async getImportVoucherDetails(voucherId: number) {
        if (!voucherId || isNaN(voucherId)) {
            throw new BadRequestException('Invalid voucher_id');
        }

        const voucher = await this.importVoucherRepo.findById(voucherId);
        if (!voucher) {
            throw new BadRequestException('Import voucher not found');
        }

        const details = await this.importDetailRepo.findByVoucherId(voucherId);

        return {
            id: voucher.id,
            supplierId: voucher.supplierId,
            supplier: { name: voucher.supplier.name },
            importDate: voucher.importDate,
            totalAmount: parseFloat(voucher.totalAmount.toString()),
            items: details.map((detail) => ({
                id: detail.id,
                item: {
                    name: detail.itemType === 'medicine' ? detail.medicine?.name : detail.medicalSupply?.name,
                },
                quantity: detail.quantity,
                unitPrice: parseFloat(detail.unitPrice.toString()),
            })),
        };
    }

    async getSupplierStats(startDate: string, endDate: string, search?: string) {
        const report = new SupplierStatsReport(this.importFacade);
        return report.generateReport({ startDate, endDate, search });
    }
}