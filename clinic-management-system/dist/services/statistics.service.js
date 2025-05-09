"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const supplier_repository_1 = require("../repositories/supplier.repository");
const importVoucher_repository_1 = require("../repositories/importVoucher.repository");
const importDetail_repository_1 = require("../repositories/importDetail.repository");
const exceptions_1 = require("../utils/exceptions");
const ImportVoucherIterator_1 = require("../patterns/iterator/ImportVoucherIterator");
const ReportTemplate_1 = require("../patterns/templateMethod/ReportTemplate");
class StatisticsService {
    constructor() {
        this.supplierRepo = new supplier_repository_1.SupplierRepository();
        this.importVoucherRepo = new importVoucher_repository_1.ImportVoucherRepository();
        this.importDetailRepo = new importDetail_repository_1.ImportDetailRepository();
    }
    getImportVouchersBySupplier(supplierId, startDate, endDate, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const iterator = new ImportVoucherIterator_1.ImportVoucherIterator(new importVoucher_repository_1.ImportVoucherRepository(), supplierId, limit);
            const vouchers = [];
            while (iterator.hasNext()) {
                const voucher = iterator.next();
                if (voucher)
                    vouchers.push(voucher);
            }
            return { vouchers, total: vouchers.length };
        });
    }
    getImportVoucherDetails(voucherId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!voucherId || isNaN(voucherId)) {
                throw new exceptions_1.BadRequestException('Invalid voucher_id');
            }
            const voucher = yield this.importVoucherRepo.findById(voucherId);
            if (!voucher) {
                throw new exceptions_1.BadRequestException('Import voucher not found');
            }
            const details = yield this.importDetailRepo.findByVoucherId(voucherId);
            return {
                id: voucher.id,
                supplierId: voucher.supplierId,
                supplier: { name: voucher.supplier.name },
                importDate: voucher.importDate,
                totalAmount: parseFloat(voucher.totalAmount.toString()),
                items: details.map((detail) => {
                    var _a, _b;
                    return ({
                        id: detail.id,
                        item: {
                            name: detail.itemType === 'medicine' ? (_a = detail.medicine) === null || _a === void 0 ? void 0 : _a.name : (_b = detail.medicalSupply) === null || _b === void 0 ? void 0 : _b.name,
                        },
                        quantity: detail.quantity,
                        unitPrice: parseFloat(detail.unitPrice.toString()),
                    });
                }),
            };
        });
    }
    getSupplierStats(startDate, endDate, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const report = new ReportTemplate_1.SupplierStatsReport(this.importFacade);
            return report.generateReport({ startDate, endDate, search });
        });
    }
}
exports.StatisticsService = StatisticsService;
