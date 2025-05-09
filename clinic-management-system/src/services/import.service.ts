import { ImportVoucherRepository } from '../repositories/importVoucher.repository';
import { ImportVoucher } from '../models/importVoucher.model';
import { BadRequestException } from '../utils/exceptions';
import { ImportDetailRepository } from '../repositories/importDetail.repository';
export class ImportVoucherService {
    private repository: ImportVoucherRepository;
    private detailRepository :ImportDetailRepository;

    constructor() {
        this.repository = new ImportVoucherRepository();
        this.detailRepository = new ImportDetailRepository()
    }

    // Lấy tất cả phiếu nhập
    async findAll(): Promise<ImportVoucher[]> {
        return this.repository.findAllWithSupplier(); // Gọi findAllWithSupplier để lấy supplier.name
    }

    // Lấy phiếu nhập theo ID
    async getById(id: number): Promise<ImportVoucher> {
        return this.repository.findById(id);
    }

    // Lấy phiếu nhập theo nhà cung cấp (có thể bổ sung filter theo ngày)
    async getBySupplier(
        supplierId: number,
        startDate?: string,
        endDate?: string
    ): Promise<ImportVoucher[]> {
        return this.repository.findBySupplier(supplierId, startDate, endDate);
    }

    // Tạo mới phiếu nhập
    async createImportVoucher(data: Partial<ImportVoucher> & { details?: Partial<ImportDetail>[] }): Promise<ImportVoucher> {
        // Validate required fields
        if (!data.supplierId || !data.importDate) {
            throw new BadRequestException('supplierId and importDate are required');
        }
        if (!data.details || !Array.isArray(data.details) || data.details.length === 0) {
            throw new BadRequestException('details array is required and must not be empty');
        }

        // Validate details
        for (const detail of data.details) {
            if (!detail.itemId || !detail.itemType || !detail.quantity || !detail.unitPrice || !detail.totalPrice) {
                throw new BadRequestException('Each detail must have itemId, itemType, quantity, unitPrice, and totalPrice');
            }
            if (!['medicine', 'supply'].includes(detail.itemType)) {
                throw new BadRequestException('itemType must be either "medicine" or "supply"');
            }
        }

        // Create and save ImportVoucher
        const voucherData = {
            supplierId: data.supplierId,
            importDate: data.importDate,
            totalAmount: data.totalAmount,
            employeeId: data.employeeId || 1,
            status: data.status || 'pending',
        };
        const voucher = await this.repository.createImportVoucher(voucherData);

        // Create and save ImportDetails
        const details = data.details.map((detail) => ({
            importVoucherId: voucher.id,
            itemId: detail.itemId,
            itemType: detail.itemType,
            quantity: detail.quantity,
            unitPrice: detail.unitPrice,
            totalPrice: detail.totalPrice,
        }));
        await this.detailRepository.createImportDetails(details);

        // Load details for response
        const savedVoucher = await this.repository.findByIdWithDetails(voucher.id);
        return savedVoucher;
    }

    // Cập nhật phiếu nhập
    async updateImportVoucher(id: number, data: Partial<ImportVoucher>): Promise<ImportVoucher> {
        return this.repository.updateImportVoucher(id, data);
    }

    // Xóa phiếu nhập
    async deleteImportVoucher(id: number): Promise<void> {
        return this.repository.deleteImportVoucher(id);
    }
    async getByIdv2(id: number): Promise<ImportVoucher> {
        return this.repository.findByIdWithDetails(id);
    }
}